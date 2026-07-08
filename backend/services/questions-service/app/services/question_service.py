import json

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

            if chat_session.user_id != user_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="La sesión no pertenece al usuario.",
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
            session_id=chat_session.id,
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

    def _build_context(
        self,
        user,
        question: str,
        intents: list[str],
        session_id: int,
    ) -> str:
        context_parts: list[str] = []

        context_parts.append(
            f"""
========================
DATOS DEL ESTUDIANTE
========================
ID: {user.id}
Nombre: {user.full_name}
Email: {user.email}
Carrera: {user.career}
Ciclo actual: {user.cycle}
Rol: {user.role}

PREGUNTA ORIGINAL:
{question}

INTENCIONES DETECTADAS:
{", ".join(intents)}
""".strip()
        )

        recent_messages = self.repository.get_recent_messages_by_session(
            session_id=session_id,
            limit=8,
        )

        if recent_messages:
            context_parts.append(
                self._format_context_block(
                    "MEMORIA RECIENTE DE LA CONVERSACIÓN",
                    [
                        {
                            "role": message.role,
                            "message": message.message,
                            "created_at": str(message.created_at),
                        }
                        for message in recent_messages
                    ],
                )
            )

        external_context = self.gateway_client.get_full_student_context(
            user_id=user.id,
            intents=intents,
        )

        context_parts.append(
            self._format_context_block(
                "CONTEXTO REAL DE MICROSERVICIOS",
                external_context,
            )
        )

        current_cycle_courses = self.repository.get_curriculum_by_cycle(
            career=user.career,
            cycle=user.cycle,
        )

        if current_cycle_courses:
            context_parts.append(
                self._format_context_block(
                    "CURSOS DEL CICLO ACTUAL EN LA MALLA",
                    [
                        {
                            "course_code": course.course_code,
                            "course_name": course.course_name,
                            "cycle": course.cycle,
                            "credits": course.credits,
                            "area": getattr(course, "area", None),
                        }
                        for course in current_cycle_courses
                    ],
                )
            )

        if self._is_professional_path_question(question, intents):
            context_parts.append(
                """
========================
GUÍA PARA RUTA PROFESIONAL
========================
Si el estudiante pregunta por DevOps, cloud, ciberseguridad, backend, datos o ruta profesional:

- No digas que no puedes recomendar si existen plataformas recomendadas en el contexto.
- Aclara que no hay una ruta oficial de especialización si no aparece en la malla.
- Luego brinda una ruta orientativa usando SOLO cursos, áreas y plataformas disponibles.
- Para DevOps, prioriza fundamentos de cloud, backend, redes, seguridad, automatización, contenedores y buenas prácticas.
- Si aparecen AWS Educate, Microsoft Learn o Cisco Networking Academy, úsalas como opciones recomendadas.
- Da pasos concretos y breves.
""".strip()
            )

        knowledge_items = self.repository.get_active_knowledge_base(limit=8)

        if knowledge_items:
            context_parts.append(
                self._format_context_block(
                    "BASE DE CONOCIMIENTO INSTITUCIONAL",
                    [
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
INSTRUCCIONES DE RESPUESTA
========================
Usa solo los datos anteriores.
Si un bloque tiene error, indícalo de forma breve y continúa con los otros bloques válidos.
No copies JSON completo en la respuesta.
Responde con claridad, brevedad y pasos concretos.
Si hay información de plataformas/certificaciones, úsala para recomendar.
""".strip()
        )

        return "\n\n".join(context_parts)

    def _is_professional_path_question(
        self,
        question: str,
        intents: list[str],
    ) -> bool:
        question_lower = question.lower()

        professional_keywords = [
            "devops",
            "cloud",
            "nube",
            "aws",
            "azure",
            "cisco",
            "certificación",
            "certificacion",
            "especializar",
            "especialización",
            "especializacion",
            "ruta",
            "recomiendas",
            "estudiar primero",
            "perfil",
        ]

        return (
            "certifications" in intents
            or "study" in intents
            or any(keyword in question_lower for keyword in professional_keywords)
        )

    def _format_context_block(self, title: str, data) -> str:
        return f"""
========================
{title}
========================
{self._to_pretty_json(data)}
""".strip()

    def _to_pretty_json(self, data) -> str:
        try:
            return json.dumps(data, ensure_ascii=False, default=str, indent=2)
        except TypeError:
            return str(data)