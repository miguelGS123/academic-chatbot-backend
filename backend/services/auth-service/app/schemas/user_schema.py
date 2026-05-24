from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    career: str
    cycle: int = Field(ge=1, le=10)


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    career: str | None
    cycle: int | None
    is_active: bool

    class Config:
        from_attributes = True


class CurrentUserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    university: str | None = None
    role: str
    career: str | None = None
    cycle: int | None = None
    is_active: bool