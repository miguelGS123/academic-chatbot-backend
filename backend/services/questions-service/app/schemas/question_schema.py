from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AskQuestionRequest(BaseModel):
    user_id: int = Field(gt=0)
    question: str = Field(
        min_length=1,
        max_length=1000,
    )
    session_id: int | None = Field(
        default=None,
        gt=0,
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
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class ChatMessageResponse(BaseModel):
    id: int
    session_id: int
    user_id: int
    role: str
    message: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)