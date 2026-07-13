import logging
from typing import Any

import google.generativeai as genai

from app.config.settings import settings


logger = logging.getLogger(__name__)


class GeminiService:
    def __init__(self) -> None:
        self.enabled = bool(settings.GEMINI_API_KEY)
        self.model = None

        if not self.enabled:
            return

        genai.configure(
            api_key=settings.GEMINI_API_KEY,
        )

        self.model = genai.GenerativeModel(
            model_name=settings.GEMINI_MODEL,
            generation_config={
                "temperature": 0.2,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": 2048,
            },
        )

    def generate_answer(
        self,
        question: str,
        context: str,
    ) -> str:
        clean_question = question.strip()
        clean_context = context.strip()

        if not clean_question:
            return "Escribe una pregunta para poder ayudarte."

        if not self.enabled or self.model is None:
            return (
                "La inteligencia artificial aún no está configurada. "
                "Falta configurar GEMINI_API_KEY."
            )

        prompt = self._build_prompt(
            question=clean_question,
            context=clean_context,
        )

        try:
            response = self.model.generate_content(
                prompt,
            )

            answer = self._extract_response_text(
                response,
            )

            if not answer:
                return (
                    "No pude generar una respuesta con la información "
                    "académica disponible. Intenta formular tu consulta "
                    "de otra manera."
                )

            if self._was_truncated(response):
                continuation = self._generate_continuation(
                    question=clean_question,
                    context=clean_context,
                    partial_answer=answer,
                )

                if continuation:
                    answer = self._join_answer_parts(
                        first_part=answer,
                        continuation=continuation,
                    )

            return answer.strip()

        except Exception:
            logger.exception(
                "Gemini failed while generating an academic answer.",
            )

            return (
                "No pude comunicarme con el servicio de inteligencia "
                "artificial en este momento. Inténtalo nuevamente en "
                "unos instantes."
            )

    def _generate_continuation(
        self,
        question: str,
        context: str,
        partial_answer: str,
    ) -> str:
        if self.model is None:
            return ""

        continuation_prompt = f"""
La respuesta anterior fue interrumpida antes de finalizar.

Continúa exactamente desde donde terminó, sin repetir el contenido anterior.
Completa únicamente la parte faltante y finaliza la respuesta de forma breve.

PREGUNTA ORIGINAL:
{question}

CONTEXTO DISPONIBLE:
{context}

RESPUESTA PARCIAL:
{partial_answer}

CONTINUACIÓN:
""".strip()

        try:
            continuation_response = self.model.generate_content(
                continuation_prompt,
            )

            return self._extract_response_text(
                continuation_response,
            )

        except Exception:
            logger.exception(
                "Gemini failed while continuing a truncated answer.",
            )

            return ""

    def _build_prompt(
        self,
        question: str,
        context: str,
    ) -> str:
        return f"""
Eres Chatzitho, un asistente académico universitario especializado en apoyar
a estudiantes de Ingeniería de Sistemas.

OBJETIVO

Responde la pregunta actual utilizando únicamente la información incluida en
el contexto proporcionado.

REGLAS OBLIGATORIAS

1. Responde siempre en español.

2. No inventes:
   - cursos;
   - docentes;
   - correos;
   - horarios;
   - aulas;
   - secciones;
   - pagos;
   - fechas;
   - montos;
   - comprobantes;
   - certificaciones;
   - requisitos académicos.

3. Responde directamente a la consulta actual.

4. Evita introducciones extensas, relleno y repetición de información que el
   estudiante no solicitó.

5. Si falta un dato específico:
   - indícalo claramente;
   - utiliza los demás datos disponibles;
   - ofrece una respuesta parcial útil cuando sea posible.

6. Si algún microservicio aparece como no disponible:
   - no muestres rutas;
   - no muestres errores internos;
   - no muestres JSON;
   - responde utilizando la información restante.

7. Utiliza la memoria reciente únicamente para interpretar referencias como:
   - "¿y su correo?";
   - "¿y después?";
   - "¿ese curso tiene prerrequisito?";
   - "¿cuándo vence?";
   - "¿qué otros cursos dicta?".

8. Para consultas sobre pagos:
   - diferencia pagado, pendiente y vencido;
   - menciona códigos de operación solo cuando existan;
   - no inventes descuentos, multas ni intereses.

9. Para consultas sobre cursos:
   - menciona nombre, horario, aula, modalidad, sección y docente solamente
     cuando estén disponibles;
   - no repitas toda la lista de cursos si se pregunta por uno específico.

10. Para consultas sobre docentes:
    - menciona nombre, curso, sección, correo, horario y aula cuando existan;
    - no inventes teléfono, oficina, asesoría o experiencia profesional.

11. Para consultas sobre estudio:
    - diferencia los datos académicos oficiales de las recomendaciones;
    - no presentes una recomendación como un requisito oficial.

12. Para DevOps, inteligencia artificial, cloud, certificaciones o empleo:
    - utiliza las plataformas disponibles en el contexto;
    - organiza la recomendación en pasos concretos;
    - adapta la ruta al ciclo actual del estudiante;
    - aclara que la ruta es orientativa cuando no sea parte oficial de la malla.

13. La respuesta debe quedar completa. No termines con:
    - una frase incompleta;
    - un título sin contenido;
    - una viñeta incompleta;
    - una enumeración sin finalizar.

14. Mantén normalmente la respuesta entre 2 y 7 párrafos breves.
    Usa listas solo cuando realmente ayuden a explicar pasos o prioridades.

15. No uses asteriscos sueltos ni devuelvas formatos Markdown incompletos.

CONTEXTO ACADÉMICO DISPONIBLE

{context}

PREGUNTA ACTUAL DEL ESTUDIANTE

{question}

RESPUESTA FINAL
""".strip()

    def _extract_response_text(
        self,
        response: Any,
    ) -> str:
        try:
            text = response.text
        except (
            AttributeError,
            ValueError,
        ):
            return ""

        if not text:
            return ""

        return text.strip()

    def _was_truncated(
        self,
        response: Any,
    ) -> bool:
        try:
            candidates = response.candidates

            if not candidates:
                return False

            finish_reason = candidates[0].finish_reason

            finish_reason_name = getattr(
                finish_reason,
                "name",
                str(finish_reason),
            )

            normalized_reason = str(
                finish_reason_name,
            ).upper()

            return (
                "MAX_TOKENS" in normalized_reason
                or normalized_reason in {"2", "FINISH_REASON_MAX_TOKENS"}
            )

        except (
            AttributeError,
            IndexError,
            TypeError,
        ):
            return False

    def _join_answer_parts(
        self,
        first_part: str,
        continuation: str,
    ) -> str:
        clean_first_part = first_part.rstrip()
        clean_continuation = continuation.lstrip()

        if not clean_continuation:
            return clean_first_part

        return f"{clean_first_part}\n{clean_continuation}"