from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.question_schema import (
    AskQuestionRequest,
    AskQuestionResponse,
    ChatMessageResponse,
    ChatSessionResponse,
)
from app.services.question_service import QuestionService


router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)


@router.get("/health")
def health():
    return {
        "service": "questions-service",
        "status": "healthy",
    }


@router.get("/db-check")
def db_check(
    db: Session = Depends(get_db),
):
    result = (
        db.execute(
            text("SELECT 1 AS ok")
        )
        .mappings()
        .first()
    )

    return {
        "database": "connected",
        "result": dict(result) if result else None,
    }


@router.post(
    "/ask",
    response_model=AskQuestionResponse,
)
async def ask_question(
    payload: AskQuestionRequest,
    db: Session = Depends(get_db),
):
    service = QuestionService(db)

    return await service.ask_question(
        user_id=payload.user_id,
        question=payload.question,
        session_id=payload.session_id,
        persist=payload.persist,
    )


@router.get(
    "/sessions/{user_id}",
    response_model=list[ChatSessionResponse],
)
def get_user_sessions(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = QuestionService(db)

    return service.get_user_sessions(
        user_id=user_id,
    )


@router.get(
    "/sessions/{session_id}/messages",
    response_model=list[ChatMessageResponse],
)
def get_session_messages(
    session_id: int,
    user_id: int | None = Query(
        default=None,
        description="Identificador del propietario de la sesión.",
    ),
    db: Session = Depends(get_db),
):
    service = QuestionService(db)

    return service.get_session_messages(
        session_id=session_id,
        user_id=user_id,
    )