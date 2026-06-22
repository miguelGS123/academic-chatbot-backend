from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.learning_platform_schema import LearningPlatformResponse
from app.schemas.study_schema import (
    CertificationResponse,
    CoursePrerequisitesResponse,
    CourseUnlocksResponse,
    CurriculumResponse,
    LearningRouteResponse,
    NextCycleResponse,
)
from app.services.study_service import StudyService

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
        "result": dict(result) if result else None,
    }


@router.get("/curriculum", response_model=list[CurriculumResponse])
def get_curriculum(
    career: str = Query(..., description="Nombre de la carrera"),
    cycle: int | None = Query(None, description="Ciclo académico"),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_curriculum(career=career, cycle=cycle)


@router.get("/next-cycle/{user_id}", response_model=NextCycleResponse)
def get_next_cycle_courses(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_next_cycle_courses(user_id=user_id)


@router.get(
    "/course-prerequisites/{course_reference}",
    response_model=CoursePrerequisitesResponse,
)
def get_course_prerequisites(
    course_reference: str,
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_course_prerequisites(course_reference=course_reference)


@router.get(
    "/course-unlocks/{course_reference}",
    response_model=CourseUnlocksResponse,
)
def get_course_unlocks(
    course_reference: str,
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_course_unlocks(course_reference=course_reference)


@router.get("/certifications", response_model=list[CertificationResponse])
def get_certifications(
    area: str | None = Query(None, description="Área de interés profesional"),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_certifications(area=area)


@router.get("/learning-route/{user_id}", response_model=list[LearningRouteResponse])
def get_learning_route(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_learning_routes_by_user(user_id=user_id)


@router.get("/learning-platforms", response_model=list[LearningPlatformResponse])
def get_learning_platforms(
    area: str | None = Query(
        None,
        description="Área profesional, por ejemplo: cloud, redes, backend",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_learning_platforms(area=area)