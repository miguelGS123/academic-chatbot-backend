from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    String,
    Text,
)
from sqlalchemy.sql import func

from app.db.database import Base


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(BigInteger, primary_key=True, index=True)
    full_name = Column(String(200), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    specialty = Column(String(150), nullable=True)
    school = Column(String(150), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class TeacherProfile(Base):
    __tablename__ = "teacher_profiles"

    id = Column(BigInteger, primary_key=True, index=True)
    teacher_id = Column(
        BigInteger,
        ForeignKey("teachers.id", ondelete="CASCADE"),
        nullable=False,
    )
    office = Column(String(150), nullable=True)
    advisory_schedule = Column(Text, nullable=True)
    meeting_url = Column(Text, nullable=True)
    biography = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class TeacherCourse(Base):
    __tablename__ = "teacher_courses"

    id = Column(BigInteger, primary_key=True, index=True)
    teacher_id = Column(
        BigInteger,
        ForeignKey("teachers.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_id = Column(
        BigInteger,
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_section_id = Column(
        BigInteger,
        ForeignKey("course_sections.id", ondelete="SET NULL"),
        nullable=True,
    )
    academic_period = Column(String(20), nullable=False)
    role = Column(String(50), default="Titular")
    created_at = Column(DateTime(timezone=True), server_default=func.now())