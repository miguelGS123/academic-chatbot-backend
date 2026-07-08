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
        "all",
    }

    def __init__(self):
        self.enabled = bool(settings.GEMINI_API_KEY)

        if self.enabled:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        else:
            self.model = None

    def classify(self, question: str) -> list[str]:
        fallback = self._fallback_classify(question)

        if not self.enabled or self.model is None:
            return fallback

        prompt = f"""
Clasifica la intención de una pregunta de un estudiante universitario.

La pregunta puede tener errores ortográficos, abreviaturas o lenguaje informal.

Intenciones válidas:
- courses: cursos matriculados, horarios, clases, sílabos, créditos.
- payments: pagos, deudas, mensualidades, cuotas, matrícula, comprobantes.
- teachers: docentes, profesores, correos, asesorías, quién dicta un curso.
- study: malla curricular, avance académico, próximo ciclo, prerrequisitos.
- certifications: certificaciones, AWS, Cisco, Azure, Microsoft, cursos externos.
- all: cuando la pregunta requiere combinar varios módulos.
- general: saludo o consulta sin intención clara.

Reglas:
- Puede haber varias intenciones.
- Si pregunta "cómo voy", "qué me recomiendas", "qué debería hacer", usa "all".
- Si pregunta por DevOps, cloud, ruta profesional o especialización, usa ["study", "courses", "certifications"].
- Si pregunta por pago y comprobante, usa ["payments"].
- Si pregunta por curso y docente, usa ["courses", "teachers"].

Responde SOLO JSON válido:
{{
  "intents": ["study", "courses"]
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
                intent for intent in intents if intent in self.VALID_INTENTS
            ]

            return normalized or fallback

        except Exception:
            return fallback

    def _extract_json(self, text: str) -> str:
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            return match.group(0)

        return text

    def _fallback_classify(self, question: str) -> list[str]:
        question_lower = question.lower()
        intents: set[str] = set()

        if any(
            word in question_lower
            for word in [
                "curso",
                "curzo",
                "clase",
                "horario",
                "hoy",
                "toca",
                "silabo",
                "sílabo",
                "creditos",
                "créditos",
            ]
        ):
            intents.add("courses")

        if any(
            word in question_lower
            for word in [
                "pago",
                "deuda",
                "debo",
                "mensualidad",
                "cuota",
                "matricula",
                "matrícula",
                "boleta",
                "comprobante",
                "pagado",
            ]
        ):
            intents.add("payments")

        if any(
            word in question_lower
            for word in [
                "docente",
                "profesor",
                "profe",
                "correo",
                "dicta",
                "asesoria",
                "asesoría",
            ]
        ):
            intents.add("teachers")

        if any(
            word in question_lower
            for word in [
                "ciclo",
                "malla",
                "prerrequisito",
                "ruta",
                "avance",
                "estudio",
                "académico",
                "academico",
            ]
        ):
            intents.add("study")

        if any(
            word in question_lower
            for word in [
                "certificacion",
                "certificación",
                "aws",
                "cisco",
                "microsoft",
                "azure",
                "devops",
                "cloud",
                "nube",
            ]
        ):
            intents.add("certifications")
            intents.add("study")
            intents.add("courses")

        if any(
            phrase in question_lower
            for phrase in [
                "cómo voy",
                "como voy",
                "qué me recomiendas",
                "que me recomiendas",
                "qué debería",
                "que deberia",
                "orientame",
                "oriéntame",
            ]
        ):
            intents.add("all")

        return list(intents) or ["general"]