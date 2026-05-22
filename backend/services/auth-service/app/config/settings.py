from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):

    APP_NAME: str = "Academic Chatbot Platform"

    APP_VERSION: str = "1.0.0"

    ENVIRONMENT: str = "development"

    API_V1_PREFIX: str = "/api/v1"

    SECRET_KEY: str

    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    DATABASE_URL: str

    RABBITMQ_URL: str = (
        "amqp://guest:guest@rabbitmq:5672/"
    )

    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000"
    ]

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True
    )


settings = Settings()