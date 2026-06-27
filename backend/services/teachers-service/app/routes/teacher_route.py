from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.teacher_schema import (
    TeacherCourseResponse,
    TeacherDetailResponse,
    TeacherResponse,
)
from app.services.teacher_service import TeacherService

router = APIRouter(prefix="/teachers", tags=["Teachers"])


@router.get("/health")
def health():
    return {
        "service": "teachers-service",
        "status": "healthy",
    }


@router.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1 AS ok")).mappings().first()

    return {
        "database": "connected",
        "result": dict(result) if result else None,
    }


@router.get("/", response_model=list[TeacherResponse])
def get_all_teachers(
    db: Session = Depends(get_db),
):
    service = TeacherService(db)

    return service.get_all_teachers()


@router.get("/my-teachers/{user_id}", response_model=list[TeacherCourseResponse])
def get_my_teachers(
    user_id: int,
    academic_period: str | None = Query(
        None,
        description="Periodo académico. Ejemplo: 202601",
    ),
    db: Session = Depends(get_db),
):
    service = TeacherService(db)

    return service.get_teachers_by_user_courses(
        user_id=user_id,
        academic_period=academic_period,
    )


@router.get("/detail/{teacher_reference}", response_model=TeacherDetailResponse)
def get_teacher_detail(
    teacher_reference: str,
    academic_period: str | None = Query(
        None,
        description="Periodo académico. Ejemplo: 202601",
    ),
    db: Session = Depends(get_db),
):
    service = TeacherService(db)

    return service.get_teacher_detail(
        teacher_reference=teacher_reference,
        academic_period=academic_period,
    )