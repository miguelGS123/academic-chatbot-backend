from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.question_repository import QuestionRepository
from app.services.gemini_service import GeminiService


class QuestionService:
    def __init__(self, db: Session):
        self.repository = QuestionRepository(db)
        self.gemini_service = GeminiService()

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

        context = self._build_context(
            user=user,
            question=question,
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

    def _build_context(self, user, question: str) -> str:
        context_parts: list[str] = []

        context_parts.append(
            f"""
DATOS DEL ESTUDIANTE:
Nombre: {user.full_name}
Carrera: {user.career}
Ciclo actual: {user.cycle}
Rol: {user.role}
""".strip()
        )

        question_lower = question.lower()

        if self._is_next_cycle_question(question_lower):
            next_cycle = user.cycle + 1 if user.cycle else None

            if next_cycle and next_cycle <= 10:
                courses = self.repository.get_curriculum_by_cycle(
                    career=user.career,
                    cycle=next_cycle,
                )

                courses_text = self._format_courses(courses)

                context_parts.append(
                    f"""
CONSULTA DETECTADA:
El estudiante pregunta por los cursos del próximo ciclo.

Ciclo actual: {user.cycle}
Próximo ciclo: {next_cycle}

CURSOS DEL PRÓXIMO CICLO:
{courses_text}
""".strip()
                )
            else:
                context_parts.append(
                    """
CONSULTA DETECTADA:
El estudiante pregunta por el próximo ciclo, pero ya se encuentra en el último ciclo o no tiene ciclo registrado.
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

    def _is_next_cycle_question(self, question: str) -> bool:
        keywords = [
            "próximo ciclo",
            "proximo ciclo",
            "siguiente ciclo",
            "cursos tendré",
            "cursos tendre",
            "qué cursos llevaré",
            "que cursos llevare",
            "cursos del ciclo siguiente",
        ]

        return any(keyword in question for keyword in keywords)

    def _format_courses(self, courses) -> str:
        if not courses:
            return "No se encontraron cursos registrados para ese ciclo."

        lines = []

        for course in courses:
            prerequisites = ", ".join(course.prerequisites or [])

            if not prerequisites:
                prerequisites = "Sin prerrequisitos registrados"

            lines.append(
                (
                    f"- {course.course_code}: {course.course_name} | "
                    f"Créditos: {course.credits} | "
                    f"Modalidad: {course.modality} | "
                    f"Tipo: {course.course_type} | "
                    f"Prerrequisitos: {prerequisites}"
                )
            )

        return "\n".join(lines)