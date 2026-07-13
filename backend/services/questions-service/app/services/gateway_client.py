import asyncio
import unicodedata
from typing import Any

import httpx

from app.config.settings import settings


class GatewayClient:
    SPECIALIZATION_ALIASES = {
        "ia": "artificial_intelligence",
        "ai": "artificial_intelligence",
        "inteligencia artificial": "artificial_intelligence",
        "machine learning": "artificial_intelligence",
        "aprendizaje automatico": "artificial_intelligence",
        "data science": "data_science",
        "ciencia de datos": "data_science",
        "devops": "devops",
        "cloud": "cloud",
        "cloud computing": "cloud",
        "nube": "cloud",
        "ciberseguridad": "cybersecurity",
        "cybersecurity": "cybersecurity",
        "backend": "backend",
        "arquitectura de software": "software_architecture",
        "gestion de proyectos": "project_management",
    }

    def __init__(self) -> None:
        self.base_url = (
            settings.GATEWAY_BASE_URL.rstrip("/")
        )

        self.timeout = httpx.Timeout(
            connect=3.0,
            read=12.0,
            write=5.0,
            pool=3.0,
        )

        self.limits = httpx.Limits(
            max_connections=20,
            max_keepalive_connections=10,
        )

    async def get_full_student_context(
        self,
        user_id: int,
        intents: list[str],
        question: str,
        career: str | None,
    ) -> dict[str, Any]:
        requested_intents = set(intents)
        load_all = "all" in requested_intents

        requests: dict[
            str,
            tuple[
                str,
                dict[str, Any] | None,
            ],
        ] = {}

        if load_all or "courses" in requested_intents:
            requests["current_courses"] = (
                f"/api/v1/courses/my-courses/{user_id}",
                None,
            )

        if load_all or "payments" in requested_intents:
            requests["payments"] = (
                f"/api/v1/payments/summary/{user_id}",
                None,
            )

        if load_all or "teachers" in requested_intents:
            requests["teachers"] = (
                f"/api/v1/teachers/my-teachers/{user_id}",
                {
                    "academic_period": (
                        settings.DEFAULT_ACADEMIC_PERIOD
                    ),
                },
            )

        if (
            load_all
            or "study" in requested_intents
            or "certifications" in requested_intents
        ):
            requests["next_cycle"] = (
                f"/api/v1/study/next-cycle/{user_id}",
                None,
            )

        specialization_code = (
            self._resolve_specialization_code(
                question
            )
        )

        if (
            specialization_code
            and career
        ):
            requests["specialization_path"] = (
                "/api/v1/study/specialization-path",
                {
                    "area": specialization_code,
                    "career": career,
                    "curriculum_code": "C2",
                },
            )

        if (
            career
            and self._requires_full_curriculum(
                question
            )
        ):
            requests["full_curriculum"] = (
                "/api/v1/study/curriculum/full",
                {
                    "career": career,
                    "curriculum_code": "C2",
                },
            )

        if (
            load_all
            or "certifications"
            in requested_intents
            or specialization_code
        ):
            requests["learning_platforms"] = (
                "/api/v1/study/learning-platforms",
                None,
            )

        if not requests:
            return {}

        async with httpx.AsyncClient(
            base_url=self.base_url,
            timeout=self.timeout,
            limits=self.limits,
        ) as client:
            tasks = {
                key: self._safe_get(
                    client=client,
                    path=path,
                    params=params,
                )
                for key, (
                    path,
                    params,
                ) in requests.items()
            }

            results = await asyncio.gather(
                *tasks.values(),
                return_exceptions=True,
            )

        context: dict[str, Any] = {}

        for key, result in zip(
            tasks.keys(),
            results,
            strict=True,
        ):
            if isinstance(
                result,
                Exception,
            ):
                context[key] = (
                    self._error_response(
                        service_name=key,
                        message=(
                            "El servicio no respondió "
                            "correctamente."
                        ),
                    )
                )
            else:
                context[key] = result

        return context

    async def _safe_get(
        self,
        client: httpx.AsyncClient,
        path: str,
        params: dict[str, Any] | None = None,
    ) -> Any:
        try:
            response = await client.get(
                path,
                params=params,
            )

            response.raise_for_status()

            return response.json()

        except httpx.TimeoutException:
            return self._error_response(
                service_name=path,
                message=(
                    "El servicio excedió el tiempo "
                    "máximo de respuesta."
                ),
            )

        except httpx.HTTPStatusError as error:
            return self._error_response(
                service_name=path,
                message=(
                    "El servicio respondió con estado "
                    f"{error.response.status_code}."
                ),
            )

        except httpx.HTTPError:
            return self._error_response(
                service_name=path,
                message=(
                    "No fue posible conectarse "
                    "con el servicio."
                ),
            )

    def _resolve_specialization_code(
        self,
        question: str,
    ) -> str | None:
        normalized_question = (
            self._normalize_text(question)
        )

        ordered_aliases = sorted(
            self.SPECIALIZATION_ALIASES.items(),
            key=lambda item: len(item[0]),
            reverse=True,
        )

        for alias, code in ordered_aliases:
            if alias in normalized_question:
                return code

        return None

    def _requires_full_curriculum(
        self,
        question: str,
    ) -> bool:
        normalized_question = (
            self._normalize_text(question)
        )

        phrases = {
            "toda mi carrera",
            "todos los ciclos",
            "del ciclo 1 al 10",
            "desde el primer ciclo",
            "desde el ciclo 1",
            "malla completa",
            "plan completo",
            "a lo largo de mi carrera",
            "cursos de toda la carrera",
            "cursos que lleve",
            "cursos que he llevado",
        }

        return any(
            phrase in normalized_question
            for phrase in phrases
        )

    def _normalize_text(
        self,
        value: str,
    ) -> str:
        normalized = unicodedata.normalize(
            "NFD",
            value.lower().strip(),
        )

        return "".join(
            character
            for character in normalized
            if unicodedata.category(character)
            != "Mn"
        )

    def _error_response(
        self,
        service_name: str,
        message: str,
    ) -> dict[str, Any]:
        return {
            "available": False,
            "service": service_name,
            "message": message,
        }