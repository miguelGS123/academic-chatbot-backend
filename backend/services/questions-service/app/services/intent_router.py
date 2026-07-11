import json
import re
import unicodedata

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

    def __init__(self) -> None:
        self.enabled = bool(settings.GEMINI_API_KEY)
        self.model = None

        if self.enabled:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)

    def classify(self, question: str) -> list[str]:
        normalized_question = self._normalize_text(question)

        local_intents = self._classify_locally(normalized_question)

        # Una intención local clara evita una llamada adicional a Gemini.
        if local_intents:
            return self._sort_intents(local_intents)

        # Solo usamos Gemini cuando la consulta realmente es ambigua.
        if not self.enabled or self.model is None:
            return ["general"]

        return self._classify_with_gemini(question)

    def _classify_locally(self, question: str) -> set[str]:
        intents: set[str] = set()

        all_phrases = {
            "como voy",
            "orientame",
            "que me recomiendas",
            "que deberia hacer",
            "como estoy academicamente",
            "analiza mi situacion",
            "dame una recomendacion",
        }

        if any(phrase in question for phrase in all_phrases):
            return {"all"}

        course_keywords = {
            "curso",
            "cursos",
            "curzo",
            "clase",
            "clases",
            "horario",
            "horarios",
            "silabo",
            "creditos",
            "matriculado",
            "matriculados",
            "aula",
            "seccion",
            "toca hoy",
        }

        payment_keywords = {
            "pago",
            "pagos",
            "deuda",
            "debo",
            "mensualidad",
            "mensualidades",
            "cuota",
            "cuotas",
            "matricula",
            "boleta",
            "comprobante",
            "pagado",
            "vencido",
            "vencimiento",
            "operacion",
        }

        teacher_keywords = {
            "docente",
            "docentes",
            "profesor",
            "profesores",
            "profe",
            "correo",
            "dicta",
            "asesoria",
            "seccion",
        }

        study_keywords = {
            "ciclo",
            "malla",
            "prerrequisito",
            "prerrequisitos",
            "ruta academica",
            "avance",
            "academico",
            "proximo ciclo",
            "siguiente ciclo",
            "plan de estudios",
        }

        certification_keywords = {
            "certificacion",
            "certificaciones",
            "aws",
            "azure",
            "cisco",
            "microsoft learn",
            "cloud",
            "nube",
            "devops",
            "especializacion",
            "especializarme",
            "ruta profesional",
        }

        if self._contains_any(question, course_keywords):
            intents.add("courses")

        if self._contains_any(question, payment_keywords):
            intents.add("payments")

        if self._contains_any(question, teacher_keywords):
            intents.add("teachers")

        if self._contains_any(question, study_keywords):
            intents.add("study")

        if self._contains_any(question, certification_keywords):
            intents.update({"certifications", "study", "courses"})

        return intents

    def _classify_with_gemini(self, question: str) -> list[str]:
        if self.model is None:
            return ["general"]

        prompt = f"""
Clasifica la intención de una pregunta de un estudiante universitario.

La pregunta puede ser una continuación de una conversación anterior, contener
errores ortográficos, abreviaturas o lenguaje informal.

Intenciones válidas:
- courses: cursos, horarios, sílabos, créditos, clases, aulas y secciones.
- payments: pagos, deudas, cuotas, matrícula, vencimientos y comprobantes.
- teachers: docentes, profesores, correos, asesorías y cursos dictados.
- study: malla, ciclo, avance, prerrequisitos y próximo ciclo.
- certifications: certificaciones, DevOps, cloud, AWS, Azure, Cisco y Microsoft.
- all: preguntas que necesitan combinar varios módulos.
- general: saludos o consultas que no requieren datos académicos específicos.

Puedes devolver varias intenciones.

Devuelve únicamente JSON válido:

{{
  "intents": ["courses"]
}}

Pregunta:
{question}
""".strip()

        try:
            response = self.model.generate_content(prompt)
            raw_text = response.text.strip()
            parsed = json.loads(self._extract_json(raw_text))

            intents = {
                intent
                for intent in parsed.get("intents", [])
                if intent in self.VALID_INTENTS
            }

            return self._sort_intents(intents) if intents else ["general"]

        except Exception:
            return ["general"]

    def _contains_any(self, text: str, keywords: set[str]) -> bool:
        return any(keyword in text for keyword in keywords)

    def _normalize_text(self, value: str) -> str:
        normalized = unicodedata.normalize("NFD", value.lower().strip())

        return "".join(
            character
            for character in normalized
            if unicodedata.category(character) != "Mn"
        )

    def _extract_json(self, text: str) -> str:
        match = re.search(r"\{.*\}", text, re.DOTALL)

        return match.group(0) if match else text

    def _sort_intents(self, intents: set[str]) -> list[str]:
        priority = [
            "all",
            "payments",
            "courses",
            "teachers",
            "study",
            "certifications",
            "general",
        ]

        return [intent for intent in priority if intent in intents]