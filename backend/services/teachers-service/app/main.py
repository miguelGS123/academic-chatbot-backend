from fastapi import FastAPI

from app.config.settings import settings
from app.routes.teacher_route import router as teacher_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(
    teacher_router,
    prefix=settings.API_V1_PREFIX,
)


@app.get("/")
def root():
    return {
        "service": "teachers-service",
        "status": "running",
        "docs": "/docs",
    }