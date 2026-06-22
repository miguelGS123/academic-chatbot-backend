from fastapi import FastAPI

from app.config.settings import settings
from app.routes.question_route import router as question_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(
    question_router,
    prefix=settings.API_V1_PREFIX,
)


@app.get("/")
def root():
    return {
        "service": "questions-service",
        "status": "running",
        "docs": "/docs",
    }