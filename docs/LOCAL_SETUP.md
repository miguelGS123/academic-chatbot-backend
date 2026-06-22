# Manual de instalación y ejecución local - Academic Chatbot Platform

## 1. Requisitos previos

Antes de ejecutar el proyecto, instalar:

- Git
- Docker Desktop
- Python 3.13
- Node.js 20 LTS
- npm
- Expo Go en el celular
- Cuenta de Supabase
- API Key de Gemini

---

## 2. Clonar repositorio

git clone https://github.com/miguelGS123/academic-chatbot-backend.git

cd academic-chatbot-backend

git checkout develop

---

## 3. Configuración de variables de entorno

### Auth Service

Ruta:

backend/services/auth-service/.env

Variables requeridas:

APP_NAME=Academic Chatbot API
APP_VERSION=1.0.0
ENVIRONMENT=development
API_V1_PREFIX=/api/v1
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/postgres
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

### Study Service

Ruta:

backend/services/study-service/.env

Variables requeridas:

APP_NAME=Study Service
APP_VERSION=1.0.0
ENVIRONMENT=development
API_V1_PREFIX=/api/v1
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/postgres

### Questions Service

Ruta:

backend/services/questions-service/.env

Variables requeridas:

APP_NAME=Questions Service
APP_VERSION=1.0.0
ENVIRONMENT=development
API_V1_PREFIX=/api/v1
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/postgres
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

---

## 4. Ejecutar Auth Service

Ingresar al servicio:

cd backend/services/auth-service

Crear entorno virtual:

python -m venv .venv

Activar entorno virtual:

.venv\Scripts\activate

Instalar dependencias:

pip install -r requirements.txt

Ejecutar servicio:

uvicorn app.main:app --reload --host 0.0.0.0 --port 8001

Swagger:

http://127.0.0.1:8001/docs

---

## 5. Ejecutar Study Service

Ingresar al servicio:

cd backend/services/study-service

Crear entorno virtual:

python -m venv .venv

Activar entorno virtual:

.venv\Scripts\activate

Instalar dependencias:

pip install -r requirements.txt

Ejecutar servicio:

uvicorn app.main:app --reload --host 0.0.0.0 --port 8002

Swagger:

http://127.0.0.1:8002/docs

Endpoints disponibles:

GET /api/v1/study/health

GET /api/v1/study/db-check

GET /api/v1/study/curriculum

GET /api/v1/study/next-cycle/{user_id}

GET /api/v1/study/course-prerequisites/{course_reference}

GET /api/v1/study/course-unlocks/{course_reference}

GET /api/v1/study/learning-platforms

---

## 6. Ejecutar Questions Service

Ingresar al servicio:

cd backend/services/questions-service

Crear entorno virtual:

python -m venv .venv

Activar entorno virtual:

.venv\Scripts\activate

Instalar dependencias:

pip install -r requirements.txt

Ejecutar servicio:

uvicorn app.main:app --reload --host 0.0.0.0 --port 8004

Swagger:

http://127.0.0.1:8004/docs

Endpoint principal:

POST /api/v1/questions/ask

Ejemplo de consulta:

{
  "user_id": 5,
  "question": "¿Qué cursos tendré el próximo ciclo?",
  "session_id": null
}

---

## 7. Ejecutar Frontend Mobile

Ingresar al frontend:

cd frontend/mobile-app

Instalar dependencias:

npm install

Validar proyecto:

npm run typecheck

npm run lint

Ejecutar Expo:

npx expo start --clear --lan

Si se necesita definir IP manualmente:

$env:REACT_NATIVE_PACKAGER_HOSTNAME="192.168.18.16"

npx expo start --clear --lan

---

## 8. Docker Compose

Levantar servicios:

docker compose up --build

Detener servicios:

docker compose down

Reconstruir completamente:

docker compose down

docker compose up --build

---

## 9. Verificar Servicios

Auth Service:

http://127.0.0.1:8001/docs

Study Service:

http://127.0.0.1:8002/docs

Questions Service:

http://127.0.0.1:8004/docs

Frontend Expo:

http://localhost:8081

---

## 10. Flujo Git

Actualizar rama develop:

git checkout develop

git pull origin develop

Registrar cambios:

git add .

git commit -m "mensaje descriptivo"

git push origin develop

Crear Pull Request:

develop → main

Esperar validación de GitHub Actions.

Realizar Merge.

---

## 11. Buenas prácticas

- No subir archivos .env
- No subir carpetas .venv
- No subir node_modules
- Mantener cada microservicio independiente
- Validar localmente antes de realizar push
- Verificar GitHub Actions antes de realizar merge
- Mantener actualizada la documentación
- Utilizar Pull Request para integrar cambios a main

---

## Estado actual del proyecto

Backend:

- Auth Service ✔
- Study Service ✔
- Questions Service ✔
- Integración Gemini ✔

Frontend:

- React Native + Expo ✔
- Login ✔
- Registro ✔
- Home ✔
- Navegación Base ✔

DevOps:

- GitHub Actions ✔
- Docker Compose (en construcción)
- Arquitectura de Microservicios ✔