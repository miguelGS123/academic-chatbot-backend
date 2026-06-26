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


class StudentCourseResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    academic_period: str | None = None
    status: str | None = None
    final_grade: Decimal | None = None
    attendance_percentage: Decimal | None = None
    course: CourseResponse | None = None


class CourseScheduleResponse(BaseModel):
    id: int
    course_id: int
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


class CourseDetailResponse(BaseModel):
    course: CourseResponse
    schedules: list[CourseScheduleResponse]
    syllabus: list[CourseSyllabusResponse]