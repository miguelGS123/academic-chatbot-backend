from sqlalchemy import Boolean, BigInteger, Column, DateTime, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="student")
    career = Column(String, nullable=True)
    cycle = Column(Integer, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())


class StudyCurriculum(Base):
    __tablename__ = "study_curriculum"

    id = Column(BigInteger, primary_key=True, index=True)
    career = Column(String(150), nullable=False)
    cycle = Column(Integer, nullable=False)
    course_code = Column(String(20), nullable=False)
    course_name = Column(String(200), nullable=False)
    credits = Column(Integer, nullable=False, default=0)
    modality = Column(String(50), nullable=True)
    prerequisites = Column(ARRAY(Text), nullable=True)
    course_type = Column(String(100), nullable=True)
    total_hours = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())