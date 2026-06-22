from sqlalchemy.orm import Session

from app.models.academic_context_model import StudyCurriculum, User
from app.models.question_model import ChatMessage, ChatSession, KnowledgeBase


class QuestionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_id(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()

    def get_curriculum_by_cycle(self, career: str, cycle: int):
        return (
            self.db.query(StudyCurriculum)
            .filter(StudyCurriculum.career.ilike(career))
            .filter(StudyCurriculum.cycle == cycle)
            .order_by(StudyCurriculum.course_code.asc())
            .all()
        )

    def get_active_knowledge_base(self, limit: int = 5):
        return (
            self.db.query(KnowledgeBase)
            .filter(KnowledgeBase.is_active.is_(True))
            .order_by(KnowledgeBase.created_at.desc())
            .limit(limit)
            .all()
        )

    def create_chat_session(self, user_id: int, title: str | None = None):
        session = ChatSession(user_id=user_id, title=title)

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session

    def get_chat_session_by_id(self, session_id: int):
        return (
            self.db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

    def create_chat_message(
        self,
        session_id: int,
        user_id: int,
        role: str,
        message: str,
    ):
        chat_message = ChatMessage(
            session_id=session_id,
            user_id=user_id,
            role=role,
            message=message,
        )

        self.db.add(chat_message)
        self.db.commit()
        self.db.refresh(chat_message)

        return chat_message

    def get_sessions_by_user(self, user_id: int):
        return (
            self.db.query(ChatSession)
            .filter(ChatSession.user_id == user_id)
            .order_by(ChatSession.created_at.desc())
            .all()
        )

    def get_messages_by_session(self, session_id: int):
        return (
            self.db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.asc())
            .all()
        )