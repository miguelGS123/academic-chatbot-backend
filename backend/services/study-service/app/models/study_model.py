from sqlalchemy import Boolean, Column, DateTime, Integer, BigInteger, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.sql import func

from app.db.database import Base


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
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())


class LearningRoute(Base):
    __tablename__ = "learning_routes"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    objective = Column(Text, nullable=True)
    recommended_path = Column(JSONB, nullable=True)
    ai_summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(BigInteger, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    provider = Column(String(150), nullable=True)
    area = Column(String(100), nullable=False)
    level = Column(String(50), nullable=True)
    duration = Column(String(100), nullable=True)
    url = Column(Text, nullable=True)
    is_free = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())