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
                "IA aún no configurada. La consulta fue registrada, "
                "pero falta configurar GEMINI_API_KEY."
            )

        prompt = f"""
Eres Chatzitho, asistente académico universitario para estudiantes de Ingeniería de Sistemas.

Reglas obligatorias:
1. Responde siempre en español.
2. Usa únicamente el contexto proporcionado.
3. No inventes cursos, pagos, docentes, correos, horarios, fechas, montos ni certificaciones.
4. Si falta información oficial, dilo claramente, pero si existen plataformas o cursos relacionados en el contexto, sí puedes dar una recomendación orientativa.
5. Responde directo, útil y sin relleno.
6. Si la pregunta es sobre pagos, responde con pendiente, vencido, pagado y comprobante si corresponde.
7. Si la pregunta es sobre cursos, responde curso, horario, modalidad, aula y docente si están disponibles.
8. Si la pregunta es sobre DevOps, cloud, certificaciones o ruta profesional, prioriza plataformas disponibles, áreas relacionadas y pasos concretos.
9. No repitas JSON completo ni bloques técnicos.
10. Si el estudiante está en último ciclo, adapta la respuesta a una ruta de especialización o empleabilidad.

CONTEXTO DISPONIBLE:
{context}

PREGUNTA DEL ESTUDIANTE:
{question}

RESPUESTA FINAL:
"""

        response = self.model.generate_content(prompt)

        if not response.text:
            return "No se pudo generar una respuesta con la información disponible."

        return response.text.strip()