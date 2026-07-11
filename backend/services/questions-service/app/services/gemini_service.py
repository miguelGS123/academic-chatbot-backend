import logging

import google.generativeai as genai

from app.config.settings import settings


logger = logging.getLogger(__name__)


class GeminiService:
    def __init__(self) -> None:
        self.enabled = bool(settings.GEMINI_API_KEY)
        self.model = None

        if not self.enabled:
            return

        genai.configure(api_key=settings.GEMINI_API_KEY)

        self.model = genai.GenerativeModel(
            model_name=settings.GEMINI_MODEL,
            generation_config={
                "temperature": 0.25,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": 900,
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
                "La consulta no pudo ser procesada porque falta configurar "
                "GEMINI_API_KEY."
            )

        prompt = self._build_prompt(
            question=clean_question,
            context=clean_context,
        )

        try:
            response = self.model.generate_content(prompt)

            answer = self._extract_response_text(response)

            if not answer:
                return (
                    "No pude generar una respuesta con la información "
                    "académica disponible. Intenta formular la consulta "
                    "de otra manera."
                )

            return answer

        except Exception:
            logger.exception(
                "Gemini failed while generating an academic answer."
            )

            return (
                "No pude comunicarme con el servicio de inteligencia "
                "artificial en este momento. Inténtalo nuevamente en unos "
                "instantes."
            )

    def _build_prompt(
        self,
        question: str,
        context: str,
    ) -> str:
        return f"""
Eres Chatzitho, un asistente académico universitario especializado en apoyar
a estudiantes de Ingeniería de Sistemas.

OBJETIVO
Responde la pregunta actual usando únicamente la información incluida en el
contexto proporcionado.

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

3. Responde directamente a la pregunta actual.

4. Evita introducciones largas, relleno y repetición de información que el
   estudiante no solicitó.

5. Si falta un dato específico:
   - indícalo claramente;
   - usa los demás datos disponibles;
   - no rechaces toda la consulta si todavía puedes brindar una respuesta
     parcial útil.

6. Si algún microservicio aparece como no disponible:
   - no muestres errores internos;
   - no muestres rutas, excepciones, JSON ni detalles técnicos;
   - continúa respondiendo con la información restante.

7. Usa la memoria reciente únicamente para interpretar continuaciones como:
   - "¿y su correo?";
   - "¿y después?";
   - "¿ese curso tiene prerrequisito?";
   - "¿cuándo vence?";
   - "¿qué otros cursos dicta?".

8. No mezcles datos de conversaciones o estudiantes distintos.

9. Para consultas de pagos:
   - diferencia total pagado, pendiente y vencido;
   - menciona comprobante o código de operación únicamente si existe;
   - no inventes cobros, descuentos, intereses o penalidades.

10. Para consultas de cursos:
    - menciona nombre, horario, aula, modalidad, sección y docente solamente
      cuando estén disponibles;
    - no repitas toda la lista de cursos si el estudiante pregunta por uno.

11. Para consultas de docentes:
    - menciona nombre, curso, sección y correo institucional cuando existan;
    - no inventes teléfono, oficina, asesorías ni experiencia profesional.

12. Para consultas de malla, avance o próximo ciclo:
    - diferencia información oficial de recomendaciones orientativas;
    - no presentes una recomendación como requisito oficial.

13. Para DevOps, cloud, certificaciones o empleabilidad:
    - usa las plataformas y cursos presentes en el contexto;
    - organiza la recomendación en pasos concretos;
    - aclara cuando se trate de una ruta orientativa;
    - adapta la respuesta al ciclo actual del estudiante.

14. Si el estudiante está en el último ciclo:
    - prioriza especialización;
    - proyectos de portafolio;
    - certificaciones disponibles;
    - preparación para empleabilidad;
    siempre que el contexto permita respaldarlo.

15. Mantén normalmente la respuesta entre 2 y 8 párrafos breves.
    Usa una lista numerada solo cuando explique pasos, prioridades o una ruta.

CONTEXTO ACADÉMICO DISPONIBLE
{context}

PREGUNTA ACTUAL DEL ESTUDIANTE
{question}

RESPUESTA FINAL
""".strip()

    def _extract_response_text(self, response) -> str:
        try:
            text = response.text
        except (AttributeError, ValueError):
            return ""

        if not text:
            return ""

        return text.strip()