from pydantic import BaseModel


class LearningPlatformResponse(BaseModel):
    id: int
    name: str
    provider: str | None = None
    base_url: str
    areas: list[str]
    description: str | None = None
    certificate_info: str | None = None
    search_hint: str | None = None
    recommended_cycle_min: int
    recommended_cycle_max: int
    is_free: bool
    has_certificate: bool

    class Config:
        from_attributes = True