from datetime import time
from decimal import Decimal

from pydantic import BaseModel


class CourseResponse(BaseModel):
    id: int
    course_code: str
    course_name: str
    career: str
    cycle: int
    credits: int | None = None
    description: str | None = None

    class Config:
        from_attributes = True


class CourseSectionResponse(BaseModel):
    id: int
    course_id: int
    section_code: str
    academic_period: str
    teacher_name: str | None = None
    capacity: int | None = None
    enrolled_count: int | None = None
    modality: str | None = None
    campus: str | None = None
    is_active: bool | None = None

    class Config:
        from_attributes = True


class CourseScheduleResponse(BaseModel):
    id: int
    course_id: int
    course_section_id: int | None = None
    day_of_week: str
    start_time: time
    end_time: time
    classroom: str | None = None
    modality: str | None = None

    class Config:
        from_attributes = True


class CourseSyllabusResponse(BaseModel):
    id: int
    course_id: int
    topic: str
    description: str | None = None
    week_number: int | None = None
    resource_url: str | None = None

    class Config:
        from_attributes = True


class StudentCourseResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    course_section_id: int | None = None
    academic_period: str | None = None
    status: str | None = None
    final_grade: Decimal | None = None
    attendance_percentage: Decimal | None = None
    course: CourseResponse | None = None
    section: CourseSectionResponse | None = None
    schedules: list[CourseScheduleResponse] = []


class CourseDetailResponse(BaseModel):
    course: CourseResponse
    section: CourseSectionResponse | None = None
    schedules: list[CourseScheduleResponse]
    syllabus: list[CourseSyllabusResponse]