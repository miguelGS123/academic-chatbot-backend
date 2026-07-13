from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.learning_platform_schema import (
    LearningPlatformResponse,
)
from app.schemas.study_schema import (
    CertificationResponse,
    CoursePrerequisitesResponse,
    CourseUnlocksResponse,
    CurriculumResponse,
    FullCurriculumResponse,
    LearningRouteResponse,
    NextCycleResponse,
    SpecializationPathResponse,
)
from app.services.study_service import StudyService


router = APIRouter(
    prefix="/study",
    tags=["Study"],
)


@router.get("/health")
def health():
    return {
        "service": "study-service",
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
        "result": (
            dict(result)
            if result
            else None
        ),
    }


@router.get(
    "/curriculum",
    response_model=list[CurriculumResponse],
)
def get_curriculum(
    career: str = Query(
        ...,
        min_length=3,
        description="Nombre de la carrera.",
    ),
    cycle: int | None = Query(
        default=None,
        ge=1,
        le=10,
        description="Ciclo académico.",
    ),
    curriculum_code: str = Query(
        default="C2",
        min_length=1,
        max_length=30,
        description="Código del plan curricular.",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_curriculum(
        career=career,
        cycle=cycle,
        curriculum_code=curriculum_code,
    )


@router.get(
    "/curriculum/full",
    response_model=FullCurriculumResponse,
)
def get_full_curriculum(
    career: str = Query(
        ...,
        min_length=3,
        description="Nombre de la carrera.",
    ),
    curriculum_code: str = Query(
        default="C2",
        min_length=1,
        max_length=30,
        description="Código del plan curricular.",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_full_curriculum(
        career=career,
        curriculum_code=curriculum_code,
    )


@router.get(
    "/specialization-path",
    response_model=SpecializationPathResponse,
)
def get_specialization_path(
    area: str = Query(
        ...,
        min_length=2,
        description=(
            "Área profesional: inteligencia artificial, "
            "DevOps, cloud, ciberseguridad, backend, etc."
        ),
    ),
    career: str = Query(
        ...,
        min_length=3,
        description="Nombre de la carrera.",
    ),
    curriculum_code: str = Query(
        default="C2",
        min_length=1,
        max_length=30,
        description="Código del plan curricular.",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_specialization_path(
        area=area,
        career=career,
        curriculum_code=curriculum_code,
    )


@router.get(
    "/next-cycle/{user_id}",
    response_model=NextCycleResponse,
)
def get_next_cycle_courses(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_next_cycle_courses(
        user_id=user_id
    )


@router.get(
    "/course-prerequisites/{course_reference}",
    response_model=CoursePrerequisitesResponse,
)
def get_course_prerequisites(
    course_reference: str,
    career: str | None = Query(
        default=None,
        description="Carrera para limitar la búsqueda.",
    ),
    curriculum_code: str = Query(
        default="C2",
        description="Código del plan curricular.",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_course_prerequisites(
        course_reference=course_reference,
        career=career,
        curriculum_code=curriculum_code,
    )


@router.get(
    "/course-unlocks/{course_reference}",
    response_model=CourseUnlocksResponse,
)
def get_course_unlocks(
    course_reference: str,
    career: str | None = Query(
        default=None,
        description="Carrera para limitar la búsqueda.",
    ),
    curriculum_code: str = Query(
        default="C2",
        description="Código del plan curricular.",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_course_unlocks(
        course_reference=course_reference,
        career=career,
        curriculum_code=curriculum_code,
    )


@router.get(
    "/certifications",
    response_model=list[CertificationResponse],
)
def get_certifications(
    area: str | None = Query(
        default=None,
        description="Área de interés profesional.",
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_certifications(
        area=area
    )


@router.get(
    "/learning-route/{user_id}",
    response_model=list[LearningRouteResponse],
)
def get_learning_route(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_learning_routes_by_user(
        user_id=user_id
    )


@router.get(
    "/learning-platforms",
    response_model=list[LearningPlatformResponse],
)
def get_learning_platforms(
    area: str | None = Query(
        default=None,
        description=(
            "Área profesional, por ejemplo: "
            "cloud, redes, backend o DevOps."
        ),
    ),
    db: Session = Depends(get_db),
):
    service = StudyService(db)

    return service.get_learning_platforms(
        area=area
    )