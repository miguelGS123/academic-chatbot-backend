from datetime import datetime
from typing import Any

from pydantic import BaseModel


class CurriculumResponse(BaseModel):
    id: int
    career: str
    cycle: int
    course_code: str
    course_name: str
    credits: int
    modality: str | None = None
    prerequisites: list[str] | None = None
    course_type: str | None = None
    total_hours: int | None = None

    class Config:
        from_attributes = True


class CertificationResponse(BaseModel):
    id: int
    title: str
    provider: str | None = None
    area: str
    level: str | None = None
    duration: str | None = None
    url: str | None = None
    is_free: bool

    class Config:
        from_attributes = True


class LearningRouteResponse(BaseModel):
    id: int
    user_id: int
    title: str
    objective: str | None = None
    recommended_path: dict[str, Any] | list[Any] | None = None
    ai_summary: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True


class NextCycleResponse(BaseModel):
    user_id: int
    student_name: str
    career: str
    current_cycle: int
    next_cycle: int
    courses: list[CurriculumResponse]


class CoursePrerequisitesResponse(BaseModel):
    course: CurriculumResponse
    prerequisite_courses: list[CurriculumResponse]
    external_requirements: list[str]


class CourseUnlocksResponse(BaseModel):
    course: CurriculumResponse
    unlocked_courses: list[CurriculumResponse]