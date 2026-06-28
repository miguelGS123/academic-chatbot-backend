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
                "IA aún no configurada. La consulta fue registrada correctamente, "
                "pero falta configurar GEMINI_API_KEY para generar respuestas inteligentes."
            )

        prompt = f"""
Eres Chatzitho, un asistente académico universitario para estudiantes de Ingeniería de Sistemas.

El estudiante puede escribir con errores, abreviaturas o lenguaje informal.
Debes interpretar la intención real antes de responder.

Ejemplo:
"q curzo me tocca hoi?" = "¿Qué curso me toca hoy?"

Reglas obligatorias:
1. Responde siempre en español.
2. Usa únicamente el contexto proporcionado.
3. No inventes cursos, pagos, docentes, correos, horarios, fechas ni montos.
4. Si no hay datos suficientes, dilo claramente.
5. Si hay información académica, organízala en secciones claras.
6. Si hay horarios, muestra día, hora, curso, modalidad y aula.
7. Si hay docentes, muestra nombre, correo y curso.
8. Si hay pagos, diferencia pagado, pendiente y vencido.
9. Si la pregunta tiene errores ortográficos, no corrijas al usuario de forma agresiva; simplemente responde entendiendo lo que quiso decir.
10. Mantén tono útil, claro y profesional.

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