from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)


class UserCreate(BaseModel):
    full_name: str = Field(
        min_length=3,
        max_length=120,
    )
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=128,
    )
    career: str = Field(
        min_length=3,
        max_length=150,
    )
    cycle: int = Field(
        ge=1,
        le=10,
    )


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    career: str | None = None
    cycle: int | None = None
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True,
    )


class CurrentUserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    university: str | None = None
    role: str
    career: str | None = None
    cycle: int | None = None
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True,
    )