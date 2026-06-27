from pydantic import BaseModel


class TeacherResponse(BaseModel):
    id: int
    full_name: str
    email: str
    specialty: str | None = None
    school: str | None = None
    is_active: bool | None = None

    class Config:
        from_attributes = True


class TeacherProfileResponse(BaseModel):
    id: int
    teacher_id: int
    office: str | None = None
    advisory_schedule: str | None = None
    meeting_url: str | None = None
    biography: str | None = None

    class Config:
        from_attributes = True


class TeacherCourseResponse(BaseModel):
    teacher_id: int
    teacher_name: str
    teacher_email: str
    course_id: int
    course_code: str
    course_name: str
    section_code: str | None = None
    academic_period: str
    role: str | None = None


class TeacherDetailResponse(BaseModel):
    teacher: TeacherResponse
    profile: TeacherProfileResponse | None = None
    assigned_courses: list[TeacherCourseResponse]