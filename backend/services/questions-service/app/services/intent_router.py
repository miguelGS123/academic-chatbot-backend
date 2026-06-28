import json
import re

import google.generativeai as genai

from app.config.settings import settings


class IntentRouter:
    VALID_INTENTS = {
        "study",
        "courses",
        "payments",
        "teachers",
        "certifications",
        "general",
    }

    def __init__(self):
        self.enabled = bool(settings.GEMINI_API_KEY)

        if self.enabled:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        else:
            self.model = None

    def classify(self, question: str) -> list[str]:
        if not self.enabled or self.model is None:
            return self._fallback_classify(question)

        prompt = f"""
Clasifica la intención de la pregunta de un estudiante universitario.

La pregunta puede venir con errores ortográficos, abreviaturas o escritura informal.
Ejemplos:
- "q curzo me tocca hoi?" significa "qué curso me toca hoy"
- "cuanto debo?" significa consulta de pagos
- "q profe dicta software?" significa consulta de docentes
- "q certificacion de aws me recomiendas?" significa consulta de certificaciones

Debes responder SOLO con JSON válido, sin explicación adicional.

Intenciones disponibles:
- "study": malla curricular, siguiente ciclo, prerrequisitos, ruta académica.
- "courses": cursos matriculados, horarios, clases, sílabos, créditos.
- "payments": pagos, deudas, mensualidades, cuotas, matrícula, comprobantes.
- "teachers": docentes, profesores, correos, asesorías, quién dicta un curso.
- "certifications": certificaciones, AWS, Cisco, Microsoft, Azure, cursos externos.
- "general": saludo, consulta general o sin intención clara.

Formato obligatorio:
{{
  "intents": ["courses"]
}}

Pregunta:
{question}
"""

        try:
            response = self.model.generate_content(prompt)
            raw_text = response.text.strip()
            clean_text = self._extract_json(raw_text)
            parsed = json.loads(clean_text)

            intents = parsed.get("intents", [])

            normalized = [
                intent
                for intent in intents
                if intent in self.VALID_INTENTS
            ]

            return normalized or ["general"]

        except Exception:
            return self._fallback_classify(question)

    def _extract_json(self, text: str) -> str:
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            return match.group(0)

        return text

    def _fallback_classify(self, question: str) -> list[str]:
        question_lower = question.lower()
        intents: set[str] = set()

        if any(word in question_lower for word in ["curso", "curzo", "clase", "horario", "hoy", "toca", "silabo", "sílabo"]):
            intents.add("courses")

        if any(word in question_lower for word in ["pago", "deuda", "debo", "mensualidad", "cuota", "matricula", "matrícula"]):
            intents.add("payments")

        if any(word in question_lower for word in ["docente", "profesor", "profe", "correo", "dicta"]):
            intents.add("teachers")

        if any(word in question_lower for word in ["ciclo", "malla", "prerrequisito", "ruta"]):
            intents.add("study")

        if any(word in question_lower for word in ["certificacion", "certificación", "aws", "cisco", "microsoft", "azure"]):
            intents.add("certifications")

        return list(intents) or ["general"]