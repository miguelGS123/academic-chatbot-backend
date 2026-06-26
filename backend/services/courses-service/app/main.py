from fastapi import FastAPI

from app.config.settings import settings
from app.routes.course_route import router as course_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(
    course_router,
    prefix=settings.API_V1_PREFIX,
)


@app.get("/")
def root():
    return {
        "service": "courses-service",
        "status": "running",
        "docs": "/docs",
    }