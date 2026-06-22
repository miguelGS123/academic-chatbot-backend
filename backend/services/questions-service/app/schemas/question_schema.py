from datetime import datetime

from pydantic import BaseModel, Field


class AskQuestionRequest(BaseModel):
    user_id: int = Field(..., description="ID del estudiante")
    question: str = Field(..., min_length=3, description="Pregunta del estudiante")
    session_id: int | None = Field(
        None,
        description="ID de sesión existente. Si se omite, se crea una nueva.",
    )


class AskQuestionResponse(BaseModel):
    session_id: int
    user_id: int
    question: str
    answer: str


class ChatSessionResponse(BaseModel):
    id: int
    user_id: int
    title: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True


class ChatMessageResponse(BaseModel):
    id: int
    session_id: int
    user_id: int
    role: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True