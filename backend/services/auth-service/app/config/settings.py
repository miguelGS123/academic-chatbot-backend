from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Academic Chatbot Platform"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    API_V1_PREFIX: str = "/api/v1"

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    JWT_ISSUER: str = "academic-chatbot-platform"
    JWT_AUDIENCE: str = "academic-chatbot-mobile"

    DATABASE_URL: str

    RABBITMQ_URL: str = (
        "amqp://guest:guest@rabbitmq:5672/"
    )

    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8081",
    ]

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()