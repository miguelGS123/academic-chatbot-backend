from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db

router = APIRouter(prefix="/study", tags=["Study"])


@router.get("/health")
def health():
    return {
        "service": "study-service",
        "status": "healthy",
    }


@router.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1 AS ok")).mappings().first()

    return {
        "database": "connected",
        "result": result,
    }