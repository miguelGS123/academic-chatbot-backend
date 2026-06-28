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

    def ask_question(
        self,
        user_id: int,
        question: str,
        session_id: int | None = None,
    ):
        user = self.repository.get_user_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado.",
            )

        if session_id:
            chat_session = self.repository.get_chat_session_by_id(session_id)

            if not chat_session:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Sesión de chat no encontrada.",
                )
        else:
            chat_session = self.repository.create_chat_session(
                user_id=user_id,
                title=question[:80],
            )

        intents = self.intent_router.classify(question)

        context = self._build_context(
            user=user,
            question=question,
            intents=intents,
        )

        answer = self.gemini_service.generate_answer(
            question=question,
            context=context,
        )

        self.repository.create_chat_message(
            session_id=chat_session.id,
            user_id=user_id,
            role="user",
            message=question,
        )

        self.repository.create_chat_message(
            session_id=chat_session.id,
            user_id=user_id,
            role="assistant",
            message=answer,
        )

        return {
            "session_id": chat_session.id,
            "user_id": user_id,
            "question": question,
            "answer": answer,
        }

    def get_user_sessions(self, user_id: int):
        return self.repository.get_sessions_by_user(user_id=user_id)

    def get_session_messages(self, session_id: int):
        session = self.repository.get_chat_session_by_id(session_id)

        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sesión de chat no encontrada.",
            )

        return self.repository.get_messages_by_session(session_id=session_id)

    def _build_context(self, user, question: str, intents: list[str]) -> str:
        context_parts: list[str] = []

        context_parts.append(
            f"""
DATOS DEL ESTUDIANTE:
ID: {user.id}
Nombre: {user.full_name}
Carrera: {user.career}
Ciclo actual: {user.cycle}
Rol: {user.role}

PREGUNTA ORIGINAL:
{question}

INTENCIONES DETECTADAS:
{", ".join(intents)}
""".strip()
        )

        if "courses" in intents:
            context_parts.append(
                self._format_context_block(
                    "CURSOS, HORARIOS Y SÍLABOS DEL ESTUDIANTE",
                    self.gateway_client.get_student_courses(user.id),
                )
            )

        if "payments" in intents:
            context_parts.append(
                self._format_context_block(
                    "RESUMEN FINANCIERO DEL ESTUDIANTE",
                    self.gateway_client.get_payments_summary(user.id),
                )
            )

        if "teachers" in intents:
            context_parts.append(
                self._format_context_block(
                    "DOCENTES ASIGNADOS AL ESTUDIANTE",
                    self.gateway_client.get_student_teachers(user.id),
                )
            )

        if "study" in intents:
            context_parts.append(
                self._format_context_block(
                    "INFORMACIÓN ACADÉMICA Y PRÓXIMO CICLO",
                    self.gateway_client.get_next_cycle_courses(user.id),
                )
            )

        if "certifications" in intents:
            context_parts.append(
                self._format_context_block(
                    "PLATAFORMAS Y CERTIFICACIONES RECOMENDADAS",
                    self.gateway_client.get_learning_platforms(),
                )
            )

        if "general" in intents and len(intents) == 1:
            context_parts.append(
                """
CONTEXTO GENERAL:
El estudiante realizó una consulta general. Responde de forma breve, amable y orientada al entorno académico.
""".strip()
            )

        knowledge_items = self.repository.get_active_knowledge_base(limit=8)

        if knowledge_items:
            knowledge_text = "\n\n".join(
                [
                    f"Título: {item.title}\nCategoría: {item.category}\nContenido: {item.content}"
                    for item in knowledge_items
                ]
            )

            context_parts.append(
                f"""
BASE DE CONOCIMIENTO INSTITUCIONAL:
{knowledge_text}
""".strip()
            )

        return "\n\n".join(context_parts)

    def _format_context_block(self, title: str, data) -> str:
        return f"""
{title}:
{data}
""".strip()