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
        self.enabled = bool(
            settings.GEMINI_API_KEY
        )

        self.model = None

        if self.enabled:
            genai.configure(
                api_key=settings.GEMINI_API_KEY
            )

            self.model = genai.GenerativeModel(
                settings.GEMINI_MODEL
            )

    def classify(
        self,
        question: str,
    ) -> list[str]:
        normalized_question = (
            self._normalize_text(question)
        )

        local_intents = (
            self._classify_locally(
                normalized_question
            )
        )

        if local_intents:
            return self._sort_intents(
                local_intents
            )

        if (
            not self.enabled
            or self.model is None
        ):
            return ["general"]

        return self._classify_with_gemini(
            question
        )

    def _classify_locally(
        self,
        question: str,
    ) -> set[str]:
        intents: set[str] = set()

        all_phrases = {
            "como voy",
            "orientame",
            "analiza mi situacion",
            "como estoy academicamente",
            "dame una recomendacion general",
        }

        if any(
            phrase in question
            for phrase in all_phrases
        ):
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
            "ciclos",
            "malla",
            "prerrequisito",
            "prerrequisitos",
            "ruta academica",
            "avance",
            "academico",
            "proximo ciclo",
            "siguiente ciclo",
            "plan de estudios",
            "toda mi carrera",
            "todos los ciclos",
            "a lo largo de mi carrera",
        }

        specialization_keywords = {
            "certificacion",
            "certificaciones",
            "especializacion",
            "especializarme",
            "ruta profesional",
            "inteligencia artificial",
            "machine learning",
            "aprendizaje automatico",
            "ciencia de datos",
            "data science",
            "big data",
            "devops",
            "cloud",
            "nube",
            "aws",
            "azure",
            "cisco",
            "microsoft learn",
            "ciberseguridad",
            "cybersecurity",
            "backend",
            "arquitectura de software",
        }

        if self._contains_any(
            question,
            course_keywords,
        ):
            intents.add("courses")

        if self._contains_any(
            question,
            payment_keywords,
        ):
            intents.add("payments")

        if self._contains_any(
            question,
            teacher_keywords,
        ):
            intents.add("teachers")

        if self._contains_any(
            question,
            study_keywords,
        ):
            intents.add("study")

        if self._contains_any(
            question,
            specialization_keywords,
        ):
            intents.update(
                {
                    "certifications",
                    "study",
                    "courses",
                }
            )

        return intents

    def _classify_with_gemini(
        self,
        question: str,
    ) -> list[str]:
        if self.model is None:
            return ["general"]

        prompt = f"""
Clasifica la intención de una pregunta realizada por un estudiante universitario.

La pregunta puede contener errores ortográficos, abreviaturas o lenguaje informal.

Intenciones válidas:
- courses: cursos matriculados, horarios, sílabos, créditos, clases, aulas y secciones.
- payments: pagos, deudas, cuotas, matrícula, vencimientos y comprobantes.
- teachers: docentes, profesores, correos, asesorías y cursos dictados.
- study: malla curricular, ciclos, avance, prerrequisitos y próximo ciclo.
- certifications: especializaciones, inteligencia artificial, DevOps, cloud,
  ciencia de datos, ciberseguridad, certificaciones y empleabilidad.
- all: preguntas que necesitan combinar varios módulos.
- general: saludos o consultas que no requieren datos académicos específicos.

Puedes devolver varias intenciones.

Devuelve únicamente JSON válido:

{{
  "intents": ["study", "certifications"]
}}

Pregunta:
{question}
""".strip()

        try:
            response = self.model.generate_content(
                prompt
            )

            raw_text = response.text.strip()

            parsed = json.loads(
                self._extract_json(
                    raw_text
                )
            )

            intents = {
                intent
                for intent in parsed.get(
                    "intents",
                    [],
                )
                if intent in self.VALID_INTENTS
            }

            return (
                self._sort_intents(intents)
                if intents
                else ["general"]
            )

        except Exception:
            return ["general"]

    def _contains_any(
        self,
        text: str,
        keywords: set[str],
    ) -> bool:
        return any(
            keyword in text
            for keyword in keywords
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

    def _extract_json(
        self,
        text: str,
    ) -> str:
        match = re.search(
            r"\{.*\}",
            text,
            re.DOTALL,
        )

        return (
            match.group(0)
            if match
            else text
        )

    def _sort_intents(
        self,
        intents: set[str],
    ) -> list[str]:
        priority = [
            "all",
            "payments",
            "courses",
            "teachers",
            "study",
            "certifications",
            "general",
        ]

        return [
            intent
            for intent in priority
            if intent in intents
        ]