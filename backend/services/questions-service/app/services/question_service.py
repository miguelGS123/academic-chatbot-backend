import asyncio
import json
from typing import Any

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.question_repository import QuestionRepository
from app.services.gateway_client import GatewayClient
from app.services.gemini_service import GeminiService
from app.services.intent_router import IntentRouter


class QuestionService:
    def __init__(self, db: Session):
        self.repository = QuestionRepository(db)
        self.gemini_service = GeminiService()
        self.intent_router = IntentRouter()
        self.gateway_client = GatewayClient()

    async def ask_question(
        self,
        user_id: int,
        question: str,
        session_id: int | None = None,
    ):
        clean_question = question.strip()

        user = self.repository.get_user_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado.",
            )

        chat_session = self._resolve_chat_session(
            user_id=user_id,
            question=clean_question,
            session_id=session_id,
        )

        intents = await asyncio.to_thread(
            self.intent_router.classify,
            clean_question,
        )

        context = await self._build_context(
            user=user,
            question=clean_question,
            intents=intents,
            session_id=chat_session.id,
        )

        answer = await asyncio.to_thread(
            self.gemini_service.generate_answer,
            clean_question,
            context,
        )

        self.repository.create_chat_messages(
            session_id=chat_session.id,
            user_id=user_id,
            user_message=clean_question,
            assistant_message=answer,
        )

        return {
            "session_id": chat_session.id,
            "user_id": user_id,
            "question": clean_question,
            "answer": answer,
        }

    def get_user_sessions(self, user_id: int):
        user = self.repository.get_user_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado.",
            )

        return self.repository.get_sessions_by_user(user_id=user_id)

    def get_session_messages(
        self,
        session_id: int,
        user_id: int | None = None,
    ):
        session = self.repository.get_chat_session_by_id(session_id)

        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sesión de chat no encontrada.",
            )

        if user_id is not None and session.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="La sesión no pertenece al usuario.",
            )

        return self.repository.get_messages_by_session(
            session_id=session_id,
        )

    def _resolve_chat_session(
        self,
        user_id: int,
        question: str,
        session_id: int | None,
    ):
        if not session_id:
            return self.repository.create_chat_session(
                user_id=user_id,
                title=question[:80],
            )

        session = self.repository.get_chat_session_by_id(session_id)

        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sesión de chat no encontrada.",
            )

        if session.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="La sesión no pertenece al usuario.",
            )

        return session

    async def _build_context(
        self,
        user,
        question: str,
        intents: list[str],
        session_id: int,
    ) -> str:
        context_parts: list[str] = [
            self._build_student_block(
                user=user,
                question=question,
                intents=intents,
            )
        ]

        recent_messages = self.repository.get_recent_messages_by_session(
            session_id=session_id,
            limit=8,
        )

        if recent_messages:
            context_parts.append(
                self._format_context_block(
                    title="MEMORIA RECIENTE DE LA CONVERSACIÓN",
                    data=[
                        {
                            "role": message.role,
                            "message": message.message,
                        }
                        for message in recent_messages
                    ],
                )
            )

        external_context = await self.gateway_client.get_full_student_context(
            user_id=user.id,
            intents=intents,
        )

        if external_context:
            context_parts.append(
                self._format_context_block(
                    title="DATOS DE LOS MÓDULOS ACADÉMICOS",
                    data=external_context,
                )
            )

        if self._needs_curriculum_context(intents):
            curriculum = self.repository.get_curriculum_by_cycle(
                career=user.career,
                cycle=user.cycle,
            )

            if curriculum:
                context_parts.append(
                    self._format_context_block(
                        title="MALLA DEL CICLO ACTUAL",
                        data=[
                            {
                                "course_code": course.course_code,
                                "course_name": course.course_name,
                                "cycle": course.cycle,
                                "credits": course.credits,
                            }
                            for course in curriculum
                        ],
                    )
                )

        knowledge_items = self.repository.get_active_knowledge_base(limit=5)

        if knowledge_items:
            context_parts.append(
                self._format_context_block(
                    title="BASE DE CONOCIMIENTO INSTITUCIONAL",
                    data=[
                        {
                            "title": item.title,
                            "category": item.category,
                            "content": item.content,
                        }
                        for item in knowledge_items
                    ],
                )
            )

        context_parts.append(
            """
========================
REGLAS FINALES
========================
- Usa únicamente la información disponible.
- No inventes datos.
- Si un servicio falló, utiliza los demás datos disponibles.
- Responde directamente a la pregunta actual.
- Usa la memoria solo para entender referencias como "él", "ese curso",
  "esa deuda" o "después".
- No muestres JSON ni detalles internos del sistema.
""".strip()
        )

        return "\n\n".join(context_parts)

    def _build_student_block(
        self,
        user,
        question: str,
        intents: list[str],
    ) -> str:
        return f"""
========================
ESTUDIANTE
========================
ID: {user.id}
Nombre: {user.full_name}
Carrera: {user.career}
Ciclo actual: {user.cycle}
Rol: {user.role}

Pregunta actual:
{question}

Intenciones detectadas:
{", ".join(intents)}
""".strip()

    def _needs_curriculum_context(self, intents: list[str]) -> bool:
        relevant_intents = {
            "all",
            "study",
            "courses",
            "certifications",
        }

        return bool(relevant_intents.intersection(intents))

    def _format_context_block(
        self,
        title: str,
        data: Any,
    ) -> str:
        return f"""
========================
{title}
========================
{self._to_pretty_json(data)}
""".strip()

    def _to_pretty_json(self, data: Any) -> str:
        try:
            return json.dumps(
                data,
                ensure_ascii=False,
                default=str,
                indent=2,
            )
        except TypeError:
            return str(data)