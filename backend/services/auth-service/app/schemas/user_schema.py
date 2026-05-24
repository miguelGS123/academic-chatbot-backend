from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    career: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    career: str | None
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
    is_active: bool