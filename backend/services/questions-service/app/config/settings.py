from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Questions Service"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    API_V1_PREFIX: str = "/api/v1"

    DATABASE_URL: str

    GEMINI_API_KEY: str | None = None
    GEMINI_MODEL: str = "gemini-2.5-flash"

    GATEWAY_BASE_URL: str = "http://api-gateway:8000"

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()