from datetime import date, datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class CurriculumResponse(BaseModel):
    id: int
    curriculum_plan_id: int | None = None
    career: str
    cycle: int
    course_code: str
    course_name: str
    credits: int
    modality: str | None = None
    course_type: str | None = None
    is_elective: bool = False
    prerequisites: list[str] = Field(
        default_factory=list,
    )

    model_config = ConfigDict(
        from_attributes=True,
    )


class CurriculumCycleResponse(BaseModel):
    cycle: int
    total_courses: int
    courses: list[CurriculumResponse]


class FullCurriculumResponse(BaseModel):
    curriculum_plan_id: int
    career: str
    curriculum_code: str
    version: str | None = None
    source_name: str | None = None
    source_date: date | None = None
    is_official: bool
    total_courses: int
    cycles: list[CurriculumCycleResponse]


class CertificationResponse(BaseModel):
    id: int
    title: str
    provider: str | None = None
    area: str
    level: str | None = None
    duration: str | None = None
    url: str | None = None
    is_free: bool

    model_config = ConfigDict(
        from_attributes=True,
    )


class LearningRouteResponse(BaseModel):
    id: int
    user_id: int
    title: str
    objective: str | None = None
    recommended_path: dict[str, Any] | list[Any] | None = None
    ai_summary: str | None = None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


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


class SpecializationCourseResponse(BaseModel):
    course_id: int
    course_code: str
    course_name: str
    cycle: int
    credits: int
    modality: str | None = None
    relevance_level: int
    justification: str | None = None


class SpecializationPathResponse(BaseModel):
    specialization_code: str
    specialization_name: str
    description: str | None = None
    career: str
    curriculum_code: str
    total_courses: int
    courses: list[SpecializationCourseResponse]