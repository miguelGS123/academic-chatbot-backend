import httpx

from app.config.settings import settings


class GatewayClient:
    def __init__(self):
        self.base_url = settings.GATEWAY_BASE_URL.rstrip("/")
        self.timeout = 12.0

    def get_student_courses(self, user_id: int):
        return self._safe_get(f"/api/v1/courses/my-courses/{user_id}")

    def get_payments_summary(self, user_id: int):
        return self._safe_get(f"/api/v1/payments/summary/{user_id}")

    def get_student_teachers(self, user_id: int, academic_period: str = "202601"):
        return self._safe_get(
            f"/api/v1/teachers/my-teachers/{user_id}",
            params={"academic_period": academic_period},
        )

    def get_next_cycle_courses(self, user_id: int):
        return self._safe_get(f"/api/v1/study/next-cycle/{user_id}")

    def get_learning_platforms(self):
        return self._safe_get("/api/v1/study/learning-platforms")

    def _safe_get(self, path: str, params: dict | None = None):
        url = f"{self.base_url}{path}"

        try:
            with httpx.Client(timeout=self.timeout) as client:
                response = client.get(url, params=params)
                response.raise_for_status()
                return response.json()
        except Exception as error:
            return {
                "error": True,
                "service_path": path,
                "message": "No se pudo obtener información del microservicio.",
                "detail": str(error),
            }