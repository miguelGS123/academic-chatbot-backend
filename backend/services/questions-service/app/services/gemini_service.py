import google.generativeai as genai

from app.config.settings import settings


class GeminiService:
    def __init__(self):
        self.enabled = bool(settings.GEMINI_API_KEY)

        if self.enabled:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        else:
            self.model = None

    def generate_answer(self, question: str, context: str) -> str:
        if not self.enabled or self.model is None:
            return (
                "IA aún no configurada. Sin embargo, la consulta fue registrada "
                "correctamente. Cuando se agregue GEMINI_API_KEY, este servicio "
                "generará respuestas usando la base de conocimiento institucional."
            )

        prompt = f"""
Eres Chatzitho, un asistente académico universitario para estudiantes de Ingeniería de Sistemas.

Reglas obligatorias:
1. Responde en español.
2. Usa únicamente el contexto proporcionado.
3. No inventes cursos, ciclos, prerrequisitos ni enlaces.
4. Si hay datos del estudiante, personaliza la respuesta.
5. Si hay cursos disponibles en el contexto, enuméralos de forma clara.
6. Si no hay información suficiente, dilo directamente.
7. Mantén una respuesta clara, útil y breve.

CONTEXTO DEL SISTEMA:
{context}

PREGUNTA DEL ESTUDIANTE:
{question}

RESPUESTA FINAL:
"""

        response = self.model.generate_content(prompt)

        if not response.text:
            return "No se pudo generar una respuesta con la información disponible."

        return response.text.strip()