from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.course_schema import (
    CourseDetailResponse,
    CourseResponse,
    CourseScheduleResponse,
    CourseSyllabusResponse,
    StudentCourseResponse,
)
from app.services.course_service import CourseService

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("/health")
def health():
    return {
        "service": "courses-service",
        "status": "healthy",
    }


@router.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1 AS ok")).mappings().first()

    return {
        "database": "connected",
        "result": dict(result) if result else None,
    }


@router.get("/", response_model=list[CourseResponse])
def get_all_courses(
    career: str | None = Query(None, description="Nombre de la carrera"),
    cycle: int | None = Query(None, description="Ciclo académico"),
    db: Session = Depends(get_db),
):
    service = CourseService(db)

    return service.get_all_courses(career=career, cycle=cycle)


@router.get("/my-courses/{user_id}", response_model=list[StudentCourseResponse])
def get_student_courses(
    user_id: int,
    db: Session = Depends(get_db),
):
    service = CourseService(db)

    return service.get_student_courses(user_id=user_id)


@router.get("/detail/{course_reference}", response_model=CourseDetailResponse)
def get_course_detail(
    course_reference: str,
    db: Session = Depends(get_db),
):
    service = CourseService(db)

    return service.get_course_detail(course_reference=course_reference)


@router.get("/schedule/{course_reference}", response_model=list[CourseScheduleResponse])
def get_course_schedule(
    course_reference: str,
    db: Session = Depends(get_db),
):
    service = CourseService(db)

    return service.get_course_schedule(course_reference=course_reference)


@router.get("/syllabus/{course_reference}", response_model=list[CourseSyllabusResponse])
def get_course_syllabus(
    course_reference: str,
    db: Session = Depends(get_db),
):
    service = CourseService(db)

    return service.get_course_syllabus(course_reference=course_reference)