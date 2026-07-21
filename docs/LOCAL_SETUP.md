# Manual Técnico de Instalación, Despliegue y Uso
# Academic Chatbot Platform

**Versión:** 2.0

**Autor:** Miguel Ángel Gamarra Serrudo

**Proyecto:** Academic Chatbot Platform

**Arquitectura:** Microservicios + Inteligencia Artificial + React Native + AWS

**Fecha:** 2026

---

# Índice

1. Introducción
2. Arquitectura del Sistema
3. Requisitos Previos
4. Instalación del Proyecto
5. Configuración del Backend
6. Configuración de la Base de Datos
7. Ejecución Local
8. Frontend Mobile
9. Uso mediante APK
10. Despliegue en AWS
11. API REST
12. Flujo Funcional del Sistema
13. Control de Versiones
14. Solución de Problemas
15. Mantenimiento
16. Anexos

---

# CAPÍTULO 1. INTRODUCCIÓN

## 1.1 Descripción General

Academic Chatbot Platform es una plataforma móvil desarrollada para brindar asistencia académica inteligente a estudiantes universitarios mediante el uso de Inteligencia Artificial Generativa y una arquitectura basada en microservicios.

El sistema permite centralizar información académica del estudiante, proporcionando acceso a funcionalidades como consulta de cursos matriculados, visualización de docentes, consulta de la malla curricular, seguimiento de pagos universitarios y un chatbot basado en IA capaz de responder preguntas académicas en tiempo real.

La solución fue diseñada bajo una arquitectura escalable, desacoplada y orientada a servicios, permitiendo que cada módulo funcione de manera independiente y pueda evolucionar sin afectar al resto del sistema.

---

## 1.2 Objetivo del Proyecto

El objetivo principal del proyecto consiste en desarrollar una plataforma móvil inteligente que facilite el acceso a información académica mediante una interfaz intuitiva y un asistente conversacional basado en Inteligencia Artificial.

La plataforma busca reducir el tiempo empleado por los estudiantes para obtener información relacionada con sus cursos, docentes, pagos y planificación académica, ofreciendo además recomendaciones inteligentes y respuestas contextuales mediante modelos de lenguaje generativo.

---

## 1.3 Objetivos Específicos

Los principales objetivos específicos del sistema son:

- Centralizar la información académica del estudiante.
- Implementar autenticación segura mediante JWT.
- Gestionar usuarios bajo una arquitectura de microservicios.
- Permitir consultas inteligentes utilizando Gemini AI.
- Mostrar información actualizada sobre cursos y docentes.
- Administrar el historial de conversaciones.
- Facilitar futuras integraciones con sistemas universitarios.

---

## 1.4 Alcance del Sistema

La plataforma contempla actualmente las siguientes funcionalidades:

- Registro de usuarios.
- Inicio de sesión.
- Gestión del perfil académico.
- Visualización de cursos matriculados.
- Consulta de docentes asignados.
- Consulta de la malla curricular.
- Recomendación de certificaciones.
- Consulta de pagos universitarios.
- Chat académico basado en IA.
- Historial de conversaciones.

No forman parte del alcance actual:

- Integración con sistemas reales de universidades.
- Pasarelas de pago reales.
- Matrícula oficial mediante SUNEDU o ERP universitario.
- Integración con sistemas institucionales externos.

---

## 1.5 Público Objetivo

El sistema está dirigido principalmente a:

- Estudiantes universitarios.
- Docentes.
- Investigadores.
- Desarrolladores encargados del mantenimiento del proyecto.
- Evaluadores académicos del proyecto de tesis.

---

## 1.6 Tecnologías Utilizadas

### Backend

- Python 3.13
- FastAPI
- SQLAlchemy
- Uvicorn
- JWT
- Pydantic

### Base de Datos

- PostgreSQL
- Supabase

### Frontend

- React Native
- Expo SDK 54
- Expo Router
- TypeScript

### Inteligencia Artificial

- Google Gemini API

### DevOps

- Docker
- Docker Compose
- Git
- GitHub
- GitHub Actions

### Infraestructura

- AWS EC2
- Ubuntu Server 24.04 LTS
- Nginx

---

# CAPÍTULO 2. ARQUITECTURA DEL SISTEMA

## 2.1 Arquitectura General

Academic Chatbot Platform fue desarrollado utilizando una arquitectura basada en microservicios.

Cada módulo del sistema se ejecuta como un servicio independiente, permitiendo una mayor escalabilidad, facilidad de mantenimiento y separación de responsabilidades.

Todos los microservicios se comunican mediante peticiones HTTP REST y utilizan una única base de datos PostgreSQL alojada en Supabase.

En producción, todas las solicitudes son recibidas inicialmente por un API Gateway implementado mediante Nginx, el cual distribuye las peticiones hacia el microservicio correspondiente.

---

## 2.2 Arquitectura Física

La arquitectura física del proyecto está compuesta por los siguientes componentes:

Cliente (APK Android)

↓

API Gateway (Nginx)

↓

Microservicios

↓

Supabase PostgreSQL

↓

Gemini AI

Toda la infraestructura se encuentra desplegada sobre una instancia EC2 de Amazon Web Services.

---

## 2.3 Microservicios

Actualmente el sistema está compuesto por seis microservicios independientes.

### Auth Service

Responsable de:

- Registro de usuarios.
- Inicio de sesión.
- Generación de JWT.
- Validación de credenciales.
- Obtención del usuario autenticado.

Puerto interno:

8000

---

### Study Service

Responsable de:

- Consulta de la malla curricular.
- Dependencias entre cursos.
- Ruta académica.
- Recomendación de certificaciones.

Puerto interno:

8002

---

### Courses Service

Responsable de:

- Cursos matriculados.
- Horarios.
- Información académica de los cursos.
- Secciones disponibles.

Puerto interno:

8003

---

### Questions Service

Responsable de:

- Comunicación con Gemini.
- Procesamiento del chatbot.
- Historial de conversaciones.
- Respuestas inteligentes.

Puerto interno:

8004

---

### Payments Service

Responsable de:

- Consulta de mensualidades.
- Estado de pagos.
- Gestión de pagos simulados.

Puerto interno:

8005

---

### Teachers Service

Responsable de:

- Información de docentes.
- Cursos asignados.
- Horarios de atención.

Puerto interno:

8006

---

## 2.4 Base de Datos

Todos los microservicios utilizan una única base de datos PostgreSQL hospedada en Supabase.

Las principales tablas utilizadas son:

- users
- study_curriculum
- courses
- teachers
- teacher_courses
- course_sections
- student_courses
- payments
- chat_history

---

## 2.5 Frontend

El frontend fue desarrollado utilizando React Native y Expo.

Las principales características son:

- Navegación mediante Expo Router.
- TypeScript.
- Arquitectura modular.
- Context API para autenticación.
- Consumo de APIs REST.

---

## 2.6 Infraestructura

El despliegue de producción utiliza:

Servidor:

AWS EC2 Ubuntu 24.04 LTS

Servidor Web:

Nginx

Contenedores:

Docker

Orquestación:

Docker Compose

Base de Datos:

Supabase PostgreSQL

---

## 2.7 Flujo General

El flujo de funcionamiento del sistema es el siguiente:

Usuario

↓

Aplicación Android

↓

API Gateway

↓

Microservicio correspondiente

↓

Base de Datos / Gemini

↓

Respuesta

↓

Aplicación Android

---

# CAPÍTULO 3. REQUISITOS PREVIOS

## 3.1 Requisitos de Hardware

Se recomienda disponer del siguiente hardware para ejecutar el proyecto localmente.

Procesador:

Intel Core i5 de décima generación o superior.

Memoria RAM:

16 GB.

Espacio disponible:

20 GB libres.

Conexión estable a Internet.

---

## 3.2 Sistema Operativo

El proyecto fue desarrollado y probado principalmente sobre:

Windows 11 Pro

Asimismo puede ejecutarse sobre:

Ubuntu 24.04 LTS

---

## 3.3 Software Requerido

Antes de iniciar la instalación deberán encontrarse instaladas las siguientes herramientas:

Git

Docker Desktop

Python 3.13

Node.js 20 LTS

npm

Expo Go

Visual Studio Code

Postman

---

## 3.4 Servicios Externos

El proyecto requiere disponer de:

Cuenta en Supabase.

API Key de Google Gemini.

Cuenta de GitHub. 

Cuenta de AWS (para despliegue).

---

## 3.5 Conocimientos Recomendados

Se recomienda que el desarrollador posea conocimientos básicos sobre:

- Git
- Docker
- Python
- FastAPI
- React Native
- SQL
- PostgreSQL
- REST API

---

# CAPÍTULO 4. INSTALACIÓN DEL PROYECTO

## 4.1 Clonar el Repositorio

Clonar el repositorio desde GitHub.

```bash
git clone https://github.com/miguelGS123/academic-chatbot-backend.git
```

Ingresar al proyecto.

```bash
cd academic-chatbot-backend
```

Cambiar a la rama de desarrollo.

```bash
git checkout develop
```

Actualizar el proyecto.

```bash
git pull origin develop
```

---

## 4.2 Estructura General

La estructura principal del proyecto es la siguiente.

backend/

frontend/

docs/

docker-compose.yml

docker-compose.prod.yml

---

## 4.3 Backend

Dentro de backend se encuentran todos los microservicios.

backend/services/

├── auth-service

├── study-service

├── courses-service

├── questions-service

├── payments-service

└── teachers-service

Cada uno posee su propio entorno virtual, dependencias y archivo de configuración.

---

## 4.4 Frontend

El frontend móvil se encuentra ubicado en:

frontend/mobile-app

Allí se desarrolla la aplicación React Native.

---

## 4.5 Variables de Entorno

Cada microservicio posee un archivo .env independiente.

Las variables más importantes corresponden a:

DATABASE_URL

SECRET_KEY

JWT

API_V1_PREFIX

GEMINI_API_KEY

BACKEND_CORS_ORIGINS

---

## 4.6 Instalación de Dependencias

Para cada microservicio ejecutar:

```bash
python -m venv .venv
```

Activar el entorno virtual.

Windows

```bash
.venv\Scripts\activate
```

Linux

```bash
source .venv/bin/activate
```

Instalar dependencias.

```bash
pip install -r requirements.txt
```

---

## 4.7 Instalación del Frontend

Ingresar al frontend.

```bash
cd frontend/mobile-app
```

Instalar dependencias.

```bash
npm install
```

Validar TypeScript.

```bash
npm run typecheck
```

Validar ESLint.

```bash
npm run lint
```

---

## 4.8 Consideraciones

Antes de ejecutar el sistema verificar que:

- Docker Desktop se encuentre iniciado.
- Supabase esté accesible.
- La API Key de Gemini sea válida.
- Todos los archivos .env estén correctamente configurados.
- No existan puertos ocupados por otros procesos.

Con esto el proyecto queda preparado para iniciar la ejecución local, cuya configuración será desarrollada en el siguiente capítulo.

# CAPÍTULO 5. CONFIGURACIÓN DEL BACKEND

## 5.1 Introducción

El backend de Academic Chatbot Platform fue desarrollado utilizando una arquitectura basada en microservicios con FastAPI. Esta decisión permitió separar las funcionalidades principales del sistema en servicios independientes, facilitando el mantenimiento, la escalabilidad y el despliegue individual de cada módulo.

A diferencia de una arquitectura monolítica, donde toda la lógica de negocio se encuentra centralizada en una única aplicación, cada microservicio implementado dentro del proyecto posee una responsabilidad claramente definida y expone únicamente los endpoints necesarios para cumplir su función.

Actualmente el backend se encuentra compuesto por seis microservicios principales, los cuales trabajan sobre una base de datos PostgreSQL compartida alojada en Supabase. La comunicación entre el cliente móvil y estos servicios se realiza mediante un API Gateway implementado con Nginx durante el despliegue en producción.

Esta organización permitió desarrollar cada módulo de manera independiente, reduciendo el acoplamiento entre componentes y facilitando futuras ampliaciones del sistema.

---

# 5.2 Arquitectura del Backend

La estructura general del backend se organiza dentro del directorio `backend`, donde se agrupan todos los microservicios y archivos relacionados con el despliegue del sistema.

La estructura principal del proyecto es la siguiente:

```text
backend/
│
├── services/
│   ├── auth-service/
│   ├── study-service/
│   ├── courses-service/
│   ├── questions-service/
│   ├── payments-service/
│   └── teachers-service/
│
├── nginx/
│
├── docker-compose.yml
│
└── docker-compose.prod.yml
```

Cada microservicio es completamente independiente y posee su propia configuración, dependencias y punto de entrada. Esta independencia permite reconstruir o actualizar un servicio específico sin afectar el funcionamiento de los demás.

Durante el desarrollo local, los servicios pueden ejecutarse individualmente utilizando Uvicorn o de manera conjunta mediante Docker Compose. En producción, todos los servicios son desplegados como contenedores Docker sobre una instancia EC2 de Amazon Web Services.

---

# 5.3 Microservicios Implementados

Academic Chatbot Platform implementa actualmente seis microservicios.

Cada uno fue diseñado para atender un conjunto específico de funcionalidades del sistema.

Los microservicios existentes son:

- Auth Service
- Study Service
- Courses Service
- Questions Service
- Payments Service
- Teachers Service

Aunque todos fueron desarrollados utilizando FastAPI, la estructura interna de cada uno puede variar dependiendo de las funcionalidades implementadas. Esta decisión fue tomada para mantener únicamente los componentes realmente necesarios dentro de cada servicio, evitando incorporar directorios vacíos o capas sin utilización práctica.

---

# 5.4 Organización Interna de los Microservicios

Durante las primeras etapas del desarrollo se evaluó mantener una estructura idéntica para todos los microservicios. Sin embargo, conforme evolucionó el proyecto se determinó que no todos requerían la misma organización interna.

Por este motivo, cada servicio incorpora únicamente los directorios que realmente utiliza.

Los componentes comunes presentes en la mayoría de microservicios son:

```text
app/

config/

core/

db/

models/

routes/

schemas/

services/

main.py
```

Cada uno de estos elementos cumple una responsabilidad específica dentro de la aplicación.

## config

Contiene la configuración general del microservicio.

Aquí se centralizan las variables de entorno, constantes y parámetros de configuración utilizados durante la ejecución del servicio.

Su utilización permite modificar aspectos de la aplicación sin necesidad de alterar el código fuente.

---

## core

Agrupa componentes compartidos relacionados principalmente con la autenticación, dependencias internas y configuración general del servicio.

Dependiendo del microservicio, esta carpeta puede contener únicamente los archivos estrictamente necesarios para su funcionamiento.

---

## db

Administra la conexión con PostgreSQL mediante SQLAlchemy.

En esta carpeta se configura el motor de conexión, la sesión utilizada por la aplicación y la clase base sobre la cual se construyen los modelos ORM.

Todos los servicios que requieren acceso a la base de datos utilizan esta configuración.

---

## models

Define las entidades ORM correspondientes a las tablas existentes dentro de Supabase.

Cada modelo representa una tabla específica y describe la estructura de los datos almacenados.

Los modelos implementados dependen de las responsabilidades propias de cada microservicio.

---

## routes

Contiene los endpoints REST expuestos por FastAPI.

Cada archivo agrupa rutas relacionadas con una funcionalidad determinada y delega la lógica de negocio hacia la capa de servicios.

Esta organización mantiene los controladores ligeros y facilita su mantenimiento.

---

## schemas

Implementa los modelos de validación mediante Pydantic.

Estos esquemas permiten validar automáticamente la información recibida por los endpoints antes de ejecutar cualquier operación sobre la base de datos.

Gracias a este mecanismo se reduce considerablemente la posibilidad de almacenar datos inconsistentes.

---

## services

Representa la capa principal de lógica de negocio.

Aquí se implementan los procesos necesarios para satisfacer cada uno de los requerimientos funcionales del sistema.

Entre las operaciones desarrolladas se encuentran:

- Registro de usuarios.
- Inicio de sesión.
- Consulta de la malla curricular.
- Obtención de cursos matriculados.
- Consulta de docentes.
- Procesamiento de preguntas mediante Gemini.
- Gestión del historial de conversaciones.
- Consulta de pagos.

La separación entre rutas y servicios permite reutilizar la lógica del sistema y mantener un código más organizado.

---

# 5.5 Directorios Opcionales

A diferencia de arquitecturas genéricas propuestas por algunos frameworks, Academic Chatbot Platform no obliga a que todos los microservicios posean exactamente la misma estructura.

Durante el desarrollo se determinó que ciertos directorios únicamente debían incorporarse cuando realmente aportaban valor al servicio correspondiente.

## repositories

Algunos servicios implementan una capa de repositorios para encapsular consultas específicas hacia la base de datos.

Sin embargo, otros servicios realizan dichas operaciones directamente desde la capa de servicios debido a la simplicidad de sus consultas.

Esta decisión permitió evitar una sobreingeniería innecesaria.

---

## utils

La carpeta `utils` únicamente se conserva en aquellos servicios que requieren funciones reutilizables.

Por ejemplo, dentro del `auth-service` se implementaron utilidades relacionadas con autenticación y operaciones auxiliares utilizadas por diferentes componentes del servicio.

Los demás microservicios no incorporan esta carpeta debido a que actualmente no poseen funciones compartidas que justifiquen su utilización.

---

## middleware

Durante las primeras iteraciones del desarrollo se consideró implementar middleware personalizado para gestionar distintos aspectos del procesamiento de solicitudes HTTP.

Sin embargo, FastAPI proporciona mecanismos nativos para la configuración de CORS, manejo de excepciones y dependencias, por lo que finalmente esta capa dejó de ser necesaria.

Como resultado, únicamente el `auth-service` conserva el directorio `middleware` como parte de la estructura inicial del proyecto, aunque actualmente no contiene implementaciones activas. Los demás microservicios no incluyen este directorio, ya que su presencia no aporta beneficios funcionales.

Esta decisión permitió simplificar la estructura general del backend y eliminar componentes sin utilización práctica.

---

# 5.6 Auth Service

El Auth Service constituye el núcleo de autenticación del sistema y fue el primer microservicio implementado durante el desarrollo del proyecto.

Su principal responsabilidad consiste en administrar el ciclo de vida de los usuarios, permitiendo registrar nuevas cuentas, autenticar estudiantes y generar los tokens JWT necesarios para acceder a los servicios protegidos de la plataforma.

Actualmente este microservicio implementa las siguientes funcionalidades:

- Registro de nuevos usuarios.
- Inicio de sesión.
- Consulta del usuario autenticado.
- Generación de tokens JWT.
- Validación de credenciales.
- Cifrado seguro de contraseñas.
- Inscripción automática del estudiante en los cursos correspondientes a su ciclo académico.

Durante el proceso de registro, el sistema valida toda la información recibida mediante esquemas Pydantic. Posteriormente la contraseña es cifrada antes de almacenarse en la base de datos y se crea el nuevo registro dentro de la tabla `users`.

Como parte de las mejoras implementadas durante el desarrollo del proyecto, el Auth Service incorpora además un proceso de inscripción automática. Una vez registrado el estudiante, el sistema consulta las secciones correspondientes al ciclo académico seleccionado y genera automáticamente los registros necesarios dentro de la tabla `student_courses`. Gracias a este proceso, el estudiante puede visualizar inmediatamente sus cursos matriculados después de iniciar sesión, sin necesidad de realizar una asignación manual.

Finalmente, el servicio genera un token JWT que será utilizado para autenticar las solicitudes realizadas hacia los demás microservicios de la plataforma.

# 5.7 Study Service

El Study Service es el microservicio encargado de administrar toda la información relacionada con la planificación académica del estudiante. Su objetivo principal consiste en proporcionar información organizada sobre la malla curricular de la carrera, las relaciones de prerrequisitos entre cursos y las certificaciones externas recomendadas para complementar la formación profesional.

A diferencia del Auth Service, este microservicio no implementa procesos de autenticación propios. Todas las solicitudes realizadas hacia sus endpoints requieren previamente un token JWT emitido por el Auth Service, garantizando que únicamente usuarios autenticados puedan acceder a la información académica.

Durante el desarrollo del proyecto se decidió concentrar dentro de este servicio únicamente la información relacionada con el plan de estudios. Esta decisión evita mezclar funcionalidades pertenecientes a otros dominios del sistema, como cursos matriculados o información de docentes, manteniendo una clara separación de responsabilidades.

Actualmente el Study Service obtiene la información directamente desde la base de datos PostgreSQL alojada en Supabase, consultando principalmente las tablas relacionadas con la malla curricular.

Las principales funcionalidades implementadas son:

- Consulta de la malla curricular completa.
- Organización de cursos por ciclo académico.
- Visualización de prerrequisitos.
- Consulta de certificaciones sugeridas.
- Consulta de información académica general.

Este servicio constituye el punto de partida para que el estudiante pueda conocer la estructura completa de su carrera antes de visualizar los cursos en los que actualmente se encuentra matriculado.

---

# 5.8 Courses Service

El Courses Service administra toda la información correspondiente a los cursos matriculados por cada estudiante.

Durante el diseño inicial del proyecto se evaluó integrar esta funcionalidad dentro del Study Service; sin embargo, posteriormente se decidió separarla debido a que ambos módulos representan dominios completamente distintos.

Mientras el Study Service administra la información global del plan curricular, el Courses Service trabaja únicamente con los cursos pertenecientes al estudiante autenticado.

Esta separación permitió reducir el acoplamiento entre módulos y simplificar futuras ampliaciones relacionadas con matrículas, horarios o asistencia.

Actualmente el servicio consulta principalmente las siguientes tablas:

- student_courses
- course_sections
- courses

El flujo de funcionamiento es el siguiente:

1. El usuario inicia sesión.
2. El Auth Service valida el token.
3. El Courses Service identifica al estudiante autenticado.
4. Se consultan los cursos registrados en la tabla `student_courses`.
5. Se obtiene la información complementaria desde `course_sections` y `courses`.
6. Finalmente se devuelve la lista de cursos matriculados hacia la aplicación móvil.

Gracias al proceso de inscripción automática implementado durante el registro del usuario, el estudiante dispone inmediatamente de una lista inicial de cursos correspondientes al ciclo académico seleccionado.

Entre las funcionalidades implementadas actualmente se encuentran:

- Consulta de cursos matriculados.
- Consulta de información general del curso.
- Asociación entre estudiante y sección.
- Obtención del docente asignado mediante relaciones con el Teachers Service.

Durante las siguientes iteraciones del proyecto este servicio podrá ampliarse para incorporar nuevas funcionalidades como horarios, asistencia, evaluaciones o calificaciones sin afectar el resto de la arquitectura.

---

# 5.9 Questions Service

El Questions Service representa el componente principal de Inteligencia Artificial dentro de Academic Chatbot Platform.

Su responsabilidad consiste en recibir las consultas realizadas por los estudiantes desde la aplicación móvil, enviarlas al modelo de lenguaje Google Gemini y devolver una respuesta generada mediante Inteligencia Artificial.

Este microservicio constituye uno de los elementos más importantes del proyecto, ya que implementa el objetivo principal de la plataforma: brindar asistencia académica inteligente en tiempo real.

A diferencia de un chatbot tradicional basado en respuestas predefinidas, este servicio utiliza la API oficial de Google Gemini para generar respuestas dinámicas considerando el contexto de la conversación.

El flujo general implementado es el siguiente:

1. El estudiante escribe una pregunta.
2. La aplicación envía la consulta al Questions Service.
3. El servicio valida el token JWT recibido.
4. Se construye el contexto de la conversación.
5. Se realiza la petición hacia la API de Gemini.
6. Gemini genera una respuesta.
7. La respuesta es almacenada en el historial del usuario.
8. Finalmente la respuesta es enviada nuevamente hacia la aplicación móvil.

Además del procesamiento mediante IA, este microservicio administra el historial de conversaciones.

Cada interacción queda registrada en la base de datos para permitir que el estudiante consulte conversaciones anteriores sin perder el contexto de sus consultas académicas.

Actualmente el servicio implementa las siguientes funcionalidades:

- Consulta mediante IA.
- Integración con Google Gemini.
- Registro del historial.
- Consulta del historial.
- Recuperación de conversaciones anteriores.

El diseño adoptado permite reemplazar en el futuro el proveedor de Inteligencia Artificial sin modificar la lógica implementada por el cliente móvil.

---

# 5.10 Payments Service

El Payments Service concentra toda la información relacionada con el estado de pagos del estudiante.

Durante el desarrollo del proyecto se optó por implementar este módulo como un microservicio independiente debido a que representa un dominio completamente diferente del resto de funcionalidades académicas.

Actualmente el servicio consulta la tabla `payments`, donde se almacena la información correspondiente a las mensualidades registradas para cada estudiante.

Las funcionalidades implementadas actualmente incluyen:

- Consulta del estado de pagos.
- Visualización de mensualidades.
- Identificación de pagos pendientes.
- Consulta de pagos realizados.

En la versión actual del proyecto, el proceso de pago tiene un comportamiento simulado, orientado principalmente a demostrar el funcionamiento de la arquitectura y la interacción entre el frontend y el backend.

Esta decisión fue tomada debido a que el alcance del proyecto no contempla la integración con pasarelas de pago reales como Izipay, Niubiz, Stripe o Mercado Pago.

No obstante, la estructura implementada permite incorporar este tipo de integraciones en futuras versiones sin necesidad de modificar el resto del sistema.

---

# 5.11 Teachers Service

El Teachers Service administra toda la información correspondiente a los docentes registrados dentro de la plataforma.

Inicialmente se consideró almacenar la información de docentes directamente junto con los cursos; sin embargo, posteriormente se decidió crear un microservicio independiente con el objetivo de mantener una separación clara entre la administración de cursos y la administración del personal docente.

Actualmente este servicio consulta principalmente las tablas:

- teachers
- teacher_courses

A través de estas relaciones es posible determinar qué docente se encuentra asignado a un determinado curso.

Entre las funcionalidades implementadas se encuentran:

- Consulta de docentes.
- Información general del docente.
- Asociación entre cursos y docentes.
- Consulta de cursos dictados.

Durante las pruebas del sistema se utilizaron inicialmente registros ficticios para completar la información de los cursos. Conforme avanzó el desarrollo, dichos registros fueron reemplazándose progresivamente por información real, manteniendo únicamente algunos docentes ficticios necesarios para completar la totalidad de la malla curricular.

Esta decisión permitió validar correctamente el funcionamiento del sistema aun cuando la información oficial disponible era limitada.

---

# 5.12 Comunicación entre Microservicios

Aunque cada microservicio fue desarrollado de forma independiente, todos trabajan de manera coordinada para satisfacer los requerimientos funcionales de la plataforma.

El Auth Service constituye el punto de entrada para cualquier usuario, ya que es responsable de autenticar las credenciales y emitir el token JWT utilizado por los demás servicios.

Una vez autenticado el estudiante, los diferentes microservicios consultan la información necesaria según la funcionalidad solicitada. Todos los servicios acceden a una base de datos PostgreSQL compartida alojada en Supabase, evitando la duplicación de información y manteniendo la consistencia de los datos.

Durante el despliegue en producción, la comunicación entre la aplicación móvil y los microservicios se realiza a través de un API Gateway implementado con Nginx, el cual centraliza las solicitudes HTTP y las redirige hacia el servicio correspondiente.

Esta arquitectura permitió simplificar el consumo de la API desde el cliente móvil, ya que la aplicación únicamente necesita conocer una dirección base del servidor, mientras que la distribución interna de las solicitudes es administrada por el Gateway.

---

# 5.13 Consideraciones de Diseño

El backend de Academic Chatbot Platform fue evolucionando conforme avanzó el desarrollo del proyecto. Por esta razón, la estructura actual refleja decisiones tomadas durante la implementación práctica y no una arquitectura genérica propuesta por el framework.

Entre las principales decisiones de diseño adoptadas se encuentran:

- Mantener únicamente los directorios realmente utilizados por cada microservicio.
- Evitar capas adicionales cuando no aportaban beneficios funcionales.
- Centralizar la autenticación en un único servicio mediante JWT.
- Compartir una única base de datos PostgreSQL entre todos los microservicios para simplificar la gestión de la información.
- Separar claramente los dominios funcionales en servicios independientes.
- Implementar una arquitectura preparada para futuras ampliaciones sin modificar la lógica existente.

Gracias a estas decisiones se obtuvo una arquitectura modular, sencilla de mantener y alineada con los objetivos académicos planteados para el proyecto.

# CAPÍTULO 6. CONFIGURACIÓN DE LA BASE DE DATOS

## 6.1 Introducción

La persistencia de la información dentro de Academic Chatbot Platform se encuentra centralizada en una base de datos PostgreSQL administrada mediante Supabase.

Desde las primeras etapas del desarrollo se decidió utilizar una única base de datos compartida por todos los microservicios. Aunque en arquitecturas empresariales es común que cada microservicio posea su propia base de datos, para este proyecto se optó por una base de datos centralizada debido a que simplifica la administración de la información, reduce la complejidad del sistema y facilita el mantenimiento durante el desarrollo académico.

Esta decisión permitió concentrar toda la información académica del sistema en un único repositorio de datos, evitando procesos adicionales de sincronización entre múltiples bases de datos.

Actualmente todos los microservicios consultan la misma instancia PostgreSQL utilizando SQLAlchemy como capa de acceso a datos.

---

# 6.2 Supabase como Gestor de Base de Datos

Supabase fue seleccionado como plataforma de persistencia debido a que ofrece PostgreSQL administrado en la nube, proporcionando un entorno estable y accesible durante todo el desarrollo del proyecto.

Entre las principales ventajas que motivaron esta elección se encuentran:

- Disponibilidad permanente en la nube.
- Compatibilidad completa con PostgreSQL.
- Administración sencilla mediante interfaz web.
- Acceso remoto desde cualquier entorno de desarrollo.
- Facilidad para realizar consultas SQL.
- Integración sencilla con FastAPI mediante SQLAlchemy.

La conexión hacia Supabase se realiza utilizando la cadena de conexión definida dentro de las variables de entorno de cada microservicio.

De esta manera, ningún dato sensible queda almacenado directamente dentro del código fuente.

---

# 6.3 Arquitectura de Persistencia

Todos los microservicios utilizan una misma base de datos.

La arquitectura implementada puede representarse de la siguiente manera:

```text
                Supabase PostgreSQL
                       │
    ┌──────────┬──────────┬──────────┬──────────┬──────────┐
    │          │          │          │          │          │
 Auth      Study     Courses   Questions   Payments   Teachers
 Service    Service    Service    Service     Service    Service
```

Cada servicio accede únicamente a las tablas necesarias para cumplir su responsabilidad.

Aunque físicamente todas las tablas pertenecen a la misma base de datos, la lógica de acceso permanece separada dentro de cada microservicio.

Esta organización permitió mantener un bajo nivel de acoplamiento entre los módulos de la aplicación.

---

# 6.4 Tablas Implementadas

Durante el desarrollo del proyecto se implementaron diversas tablas para almacenar la información académica utilizada por la aplicación móvil.

Las principales tablas actualmente utilizadas son:

- users
- study_curriculum
- courses
- teachers
- teacher_courses
- course_sections
- student_courses
- payments
- chat_history

Cada una de estas tablas representa un dominio específico del sistema.

---

# 6.5 Tabla Users

La tabla `users` constituye el punto central del sistema de autenticación.

En ella se almacena toda la información correspondiente a los estudiantes registrados dentro de la plataforma.

Entre los datos registrados se encuentran:

- Identificador único.
- Nombre completo.
- Correo electrónico.
- Contraseña cifrada.
- Carrera.
- Ciclo académico.
- Estado del usuario.
- Fecha de creación.
- Fecha de actualización.

Durante el registro de un nuevo estudiante, esta tabla es la primera en ser actualizada.

Posteriormente, otros procesos utilizan el identificador generado para registrar información relacionada con el estudiante.

---

# 6.6 Tabla Study Curriculum

La tabla `study_curriculum` almacena toda la estructura de la malla curricular utilizada por la plataforma.

Esta información fue obtenida a partir del plan de estudios correspondiente a la carrera y posteriormente importada hacia Supabase.

Cada registro contiene información como:

- Código del curso.
- Nombre.
- Ciclo.
- Créditos.
- Horas.
- Tipo.
- Prerrequisitos.

Gracias a esta tabla es posible mostrar al estudiante la organización completa de su carrera.

Asimismo, constituye la fuente principal utilizada por el Study Service.

---

# 6.7 Tabla Courses

La tabla `courses` almacena el catálogo general de cursos disponibles dentro del sistema.

Aunque inicialmente la información provenía directamente de la malla curricular, posteriormente se decidió separar ambos conceptos.

Mientras `study_curriculum` representa la planificación académica de la carrera, `courses` representa el catálogo de cursos que posteriormente podrá utilizarse para asignaciones, horarios y matrículas.

Actualmente esta tabla contiene la totalidad de cursos correspondientes a la carrera implementada.

---

# 6.8 Tabla Teachers

La tabla `teachers` almacena la información correspondiente a los docentes registrados dentro del sistema.

Durante las primeras etapas del desarrollo únicamente se disponía de información parcial sobre algunos profesores.

Con el objetivo de validar correctamente la arquitectura del sistema, se incorporaron registros ficticios para completar los cursos que aún no contaban con un docente asignado.

Posteriormente se fueron reemplazando progresivamente por información real cuando esta estuvo disponible.

Esta decisión permitió continuar el desarrollo del proyecto sin detener el avance de las funcionalidades dependientes de esta información.

---

# 6.9 Tabla Teacher Courses

La relación entre docentes y cursos se administra mediante la tabla `teacher_courses`.

Esta tabla implementa una relación de asociación que permite asignar uno o varios cursos a un determinado docente.

Gracias a esta estructura fue posible mantener desacoplada la información de docentes respecto al catálogo general de cursos.

Asimismo facilita futuras ampliaciones como cambios de docente por ciclo académico.

---

# 6.10 Tabla Course Sections

La tabla `course_sections` almacena las diferentes secciones disponibles para cada curso.

Aunque actualmente cada curso posee únicamente una sección registrada, la estructura fue diseñada considerando futuras ampliaciones donde un mismo curso pueda ofrecer múltiples horarios o grupos.

Esta tabla constituye además un elemento fundamental durante el proceso de inscripción automática implementado por el Auth Service.

Cuando un estudiante completa su registro, el sistema consulta esta tabla para identificar las secciones correspondientes a su ciclo académico y generar automáticamente su matrícula inicial.

---

# 6.11 Tabla Student Courses

La tabla `student_courses` representa la matrícula académica de cada estudiante.

Cada registro relaciona un usuario con una sección específica.

Inicialmente esta tabla únicamente contenía información correspondiente al usuario de pruebas utilizado durante el desarrollo.

Posteriormente se implementó un proceso automático dentro del Auth Service que registra los cursos del estudiante inmediatamente después de finalizar el proceso de creación de cuenta.

Gracias a esta mejora, los nuevos usuarios visualizan sus cursos desde el primer inicio de sesión sin necesidad de realizar procesos manuales de asignación.

Esta funcionalidad representa una de las mejoras más importantes implementadas durante las últimas etapas del proyecto.

---

# 6.12 Tabla Payments

La tabla `payments` almacena la información correspondiente al estado de pagos de cada estudiante.

Cada registro identifica:

- Usuario.
- Concepto.
- Monto.
- Fecha.
- Estado.

Actualmente el sistema utiliza esta información para mostrar el historial de mensualidades dentro de la aplicación móvil.

La arquitectura implementada permite incorporar posteriormente integraciones con pasarelas de pago reales sin modificar la estructura principal de la base de datos.

---

# 6.13 Tabla Chat History

La tabla `chat_history` almacena todas las conversaciones realizadas mediante el chatbot académico.

Cada interacción registra:

- Usuario.
- Pregunta realizada.
- Respuesta generada.
- Fecha y hora.

Esta información permite reconstruir conversaciones anteriores y ofrecer una mejor experiencia al estudiante.

El historial también constituye una base importante para futuras mejoras relacionadas con memoria conversacional y personalización del asistente inteligente.

---

# 6.14 Relaciones entre Tablas

La información almacenada dentro de la base de datos se encuentra organizada mediante relaciones que permiten mantener la consistencia entre los diferentes módulos del sistema.

Las relaciones principales implementadas son:

- Un usuario puede poseer múltiples cursos matriculados.
- Un curso puede pertenecer a múltiples estudiantes.
- Un docente puede dictar varios cursos.
- Un curso puede estar asociado a una sección.
- Un estudiante puede registrar múltiples pagos.
- Un estudiante puede mantener múltiples conversaciones con el chatbot.

Esta organización evita la duplicación de información y facilita la consulta de datos desde los diferentes microservicios.

---

# 6.15 Consideraciones de Diseño

Durante el desarrollo del proyecto se adoptaron diversas decisiones relacionadas con la persistencia de la información.

Las más relevantes fueron:

- Utilizar PostgreSQL por su robustez y compatibilidad con SQLAlchemy.
- Centralizar toda la información en una única base de datos.
- Mantener una estructura relacional sencilla y fácil de mantener.
- Evitar duplicidad de datos entre tablas.
- Diseñar tablas preparadas para futuras ampliaciones.
- Implementar procesos automáticos de inscripción académica durante el registro del estudiante.

Estas decisiones permitieron desarrollar una base de datos consistente con las necesidades actuales del proyecto y preparada para incorporar nuevas funcionalidades en futuras versiones.

# CAPÍTULO 7. EJECUCIÓN LOCAL DEL PROYECTO

## 7.1 Introducción

Una vez completada la instalación de todas las dependencias y configurada la base de datos, el siguiente paso consiste en ejecutar Academic Chatbot Platform en un entorno local de desarrollo.

Durante el desarrollo del proyecto se utilizaron dos modalidades de ejecución. La primera consistió en ejecutar cada microservicio individualmente utilizando Uvicorn para facilitar las pruebas y depuración del código. La segunda modalidad empleó Docker Compose para levantar todos los servicios de manera conjunta, simulando un entorno similar al utilizado posteriormente en producción.

En este capítulo se describe el procedimiento utilizado durante el desarrollo del proyecto, incluyendo la ejecución del backend, frontend móvil y las herramientas empleadas para validar el correcto funcionamiento de cada componente.

---

# 7.2 Preparación del Entorno

Antes de iniciar el proyecto es necesario verificar que todos los servicios requeridos se encuentren disponibles.

Se recomienda comprobar los siguientes aspectos:

- Docker Desktop iniciado.
- Conexión a Internet estable.
- Supabase accesible.
- Variables de entorno configuradas.
- Dependencias instaladas.
- Ningún puerto utilizado por el proyecto ocupado por otro proceso.

Asimismo, se recomienda abrir el proyecto utilizando Visual Studio Code para facilitar la ejecución de los diferentes microservicios en terminales independientes.

---

# 7.3 Organización del Proyecto Durante el Desarrollo

Durante el desarrollo del sistema se trabajó utilizando la siguiente organización de directorios.

```text
academic-chatbot-platform/

backend/

frontend/

docs/

.github/

docker-compose.yml

docker-compose.prod.yml
```

La carpeta `backend` contiene todos los microservicios, mientras que `frontend` almacena la aplicación móvil desarrollada con React Native y Expo.

Cada microservicio puede ejecutarse de forma independiente, lo cual facilita la identificación de errores y reduce el tiempo necesario para realizar pruebas durante el desarrollo.

---

# 7.4 Ejecución Individual de los Microservicios

Aunque el proyecto puede ejecutarse utilizando Docker Compose, durante el desarrollo se optó por ejecutar cada microservicio individualmente mediante Uvicorn.

Esta estrategia permitió visualizar inmediatamente los errores generados por cada servicio y simplificó considerablemente el proceso de depuración.

El procedimiento general utilizado fue el siguiente.

Ingresar al directorio correspondiente del microservicio.

```bash
cd backend/services/auth-service
```

Activar el entorno virtual.

Windows

```bash
.venv\Scripts\activate
```

Linux

```bash
source .venv/bin/activate
```

Finalmente ejecutar el servidor.

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Cada microservicio utiliza un puerto diferente para evitar conflictos durante la ejecución simultánea.

---

# 7.5 Puertos Utilizados

Durante el desarrollo se asignó un puerto específico para cada microservicio.

| Microservicio | Puerto |
|---------------|--------|
| Auth Service | 8000 |
| Study Service | 8002 |
| Courses Service | 8003 |
| Questions Service | 8004 |
| Payments Service | 8005 |
| Teachers Service | 8006 |

Esta distribución permitió mantener una organización consistente tanto en desarrollo como en producción.

---

# 7.6 Documentación Automática

Todos los microservicios desarrollados con FastAPI generan automáticamente la documentación de sus endpoints.

Una vez iniciado un servicio, la documentación puede consultarse mediante Swagger UI.

Por ejemplo, para Auth Service:

```text
http://localhost:8000/docs
```

Asimismo, FastAPI genera la documentación alternativa mediante ReDoc.

```text
http://localhost:8000/redoc
```

Estas herramientas fueron utilizadas continuamente durante el desarrollo para validar el funcionamiento de los endpoints antes de integrarlos con la aplicación móvil.

---

# 7.7 Ejecución Mediante Docker Compose

Conforme el proyecto fue creciendo, ejecutar manualmente cada microservicio comenzó a resultar poco práctico.

Por esta razón se incorporó Docker Compose como mecanismo para iniciar todos los servicios mediante un único comando.

Durante el desarrollo se utilizó el archivo:

```text
docker-compose.yml
```

Mientras que para el servidor de producción se empleó:

```text
docker-compose.prod.yml
```

La utilización de Docker Compose garantiza que todos los servicios se ejecuten utilizando exactamente las mismas versiones de dependencias y configuraciones, independientemente del equipo donde se despliegue la aplicación.

---

# 7.8 Verificación de Contenedores

Una vez iniciado Docker Compose, se recomienda verificar que todos los contenedores se encuentren ejecutándose correctamente.

Para ello se utilizó el siguiente comando:

```bash
docker ps
```

Este comando permite visualizar:

- Nombre del contenedor.
- Estado.
- Puertos publicados.
- Tiempo de ejecución.

Durante el desarrollo esta verificación se realizó antes de iniciar las pruebas desde la aplicación móvil.

---

# 7.9 Visualización de Logs

Cuando un microservicio presentaba errores durante su ejecución, el mecanismo principal de diagnóstico consistía en consultar los registros generados por Docker.

El comando utilizado fue:

```bash
docker logs auth-service
```

o bien

```bash
docker logs --tail 100 auth-service
```

Estos registros permitieron identificar rápidamente errores relacionados con:

- Variables de entorno.
- Conexión con Supabase.
- Errores de autenticación.
- Excepciones generadas por FastAPI.
- Consultas SQL.

La revisión continua de los logs fue una de las principales herramientas utilizadas durante la etapa de desarrollo.

---

# 7.10 Validación de Endpoints

Una vez iniciado cada microservicio se realizaron pruebas funcionales utilizando Swagger UI y Postman.

Estas pruebas permitieron validar:

- Registro de usuarios.
- Inicio de sesión.
- Generación de JWT.
- Consulta de cursos.
- Consulta de docentes.
- Consulta de pagos.
- Comunicación con Gemini.

Solo después de verificar el correcto funcionamiento mediante estas herramientas se procedía a integrar el endpoint correspondiente con la aplicación móvil.

---

# 7.11 Flujo General de Ejecución

El flujo seguido durante una sesión típica de desarrollo fue el siguiente:

1. Iniciar Docker Desktop.
2. Verificar conexión con Supabase.
3. Ejecutar los microservicios.
4. Validar los endpoints mediante Swagger.
5. Ejecutar la aplicación móvil.
6. Realizar pruebas funcionales.
7. Revisar los logs cuando ocurría algún error.
8. Corregir el código y repetir el proceso.

Este procedimiento fue utilizado durante todo el desarrollo del proyecto y permitió mantener un ciclo continuo de integración y pruebas.

# 7.12 Ejecución del Auth Service

El Auth Service se ejecuta desde la siguiente ruta:

```text
backend/services/auth-service
```

En Windows PowerShell:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\auth-service
```

Activar el entorno virtual:

```powershell
.\.venv\Scripts\Activate.ps1
```

Ejecutar el servicio:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Una vez iniciado, se puede validar mediante:

```text
http://localhost:8000/health
```

Documentación Swagger:

```text
http://localhost:8000/docs
```

El Auth Service debe iniciarse correctamente antes de probar el registro, inicio de sesión o consulta del perfil autenticado.

---

# 7.13 Ejecución del Study Service

Ruta del servicio:

```text
backend/services/study-service
```

Comandos:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\study-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8002
```

Swagger:

```text
http://localhost:8002/docs
```

Este servicio requiere conexión activa con Supabase, debido a que consulta la malla curricular y la información relacionada con el módulo de estudio.

Durante las primeras pruebas se presentaron errores relacionados con `WatchFiles` y el modo `--reload`. Cuando este problema vuelva a presentarse, puede ejecutarse temporalmente sin recarga automática:

```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8002
```

Esta alternativa mantiene operativo el servicio, aunque obliga a reiniciarlo manualmente después de modificar el código.

---

# 7.14 Ejecución del Courses Service

Ruta:

```text
backend/services/courses-service
```

Comandos:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\courses-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8003
```

Swagger:

```text
http://localhost:8003/docs
```

Para probar correctamente este servicio debe existir:

- Un usuario registrado.
- Una sección asociada a cada curso.
- Registros del usuario en `student_courses`.
- Un token JWT válido.

La inscripción automática implementada en el Auth Service genera las relaciones necesarias después del registro de un nuevo estudiante.

---

# 7.15 Ejecución del Questions Service

Ruta:

```text
backend/services/questions-service
```

Comandos:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\questions-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8004
```

Swagger:

```text
http://localhost:8004/docs
```

Antes de iniciar este servicio debe verificarse que el archivo `.env` contenga una API Key válida de Gemini.

Ejemplo referencial:

```env
GEMINI_API_KEY=valor_de_la_api_key
```

La clave real no debe incluirse en el repositorio, documentación pública ni capturas de pantalla.

Cuando el servicio no logra comunicarse con Gemini, se debe revisar:

- Validez de la API Key.
- Conectividad a Internet.
- Nombre del modelo configurado.
- Límites de uso de la API.
- Logs del servicio.

---

# 7.16 Ejecución del Payments Service

Ruta:

```text
backend/services/payments-service
```

Comandos:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\payments-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8005
```

Swagger:

```text
http://localhost:8005/docs
```

El servicio consulta los registros de pagos asociados al estudiante autenticado.

La versión actual permite visualizar información de mensualidades y sus estados. No integra una pasarela financiera real.

---

# 7.17 Ejecución del Teachers Service

Ruta:

```text
backend/services/teachers-service
```

Comandos:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\teachers-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8006
```

Swagger:

```text
http://localhost:8006/docs
```

El servicio consulta docentes, cursos asignados y relaciones almacenadas en `teacher_courses`.

Los registros que contienen la marca `(FICTICIO)` corresponden a datos de prueba incorporados para completar las asignaciones académicas que no disponían de información real.

---

# 7.18 Ejecución Simultánea en Windows

Para ejecutar los seis microservicios sin Docker se debe utilizar una terminal independiente por servicio.

Terminal 1:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\auth-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\study-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8002
```

Terminal 3:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\courses-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8003
```

Terminal 4:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\questions-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8004
```

Terminal 5:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\payments-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8005
```

Terminal 6:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\backend\services\teachers-service
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8006
```

Esta modalidad se utilizó principalmente durante la depuración individual de servicios.

---

# 7.19 Ejecución con Docker Compose

Para levantar el backend completo mediante contenedores se debe ejecutar el comando desde la raíz donde se encuentre el archivo `docker-compose.yml`.

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform
```

Construir e iniciar los servicios:

```powershell
docker compose up -d --build
```

El parámetro `--build` reconstruye las imágenes antes de iniciar los contenedores.

El parámetro `-d` ejecuta los servicios en segundo plano.

Verificar el estado:

```powershell
docker compose ps
```

También puede utilizarse:

```powershell
docker ps
```

Visualizar los logs generales:

```powershell
docker compose logs
```

Visualizar logs en tiempo real:

```powershell
docker compose logs -f
```

Detener los servicios:

```powershell
docker compose down
```

Detenerlos y eliminar volúmenes asociados al archivo Compose:

```powershell
docker compose down -v
```

La opción `-v` debe utilizarse con precaución, especialmente cuando existan volúmenes con información que deba conservarse.

---

# 7.20 Reconstrucción de un Solo Microservicio

Cuando únicamente se modifica un servicio, no es necesario reconstruir todo el backend.

Ejemplo para Auth Service:

```powershell
docker compose up -d --build --no-deps auth-service
```

El parámetro `--no-deps` evita reiniciar innecesariamente los servicios dependientes.

Después de la reconstrucción se recomienda revisar:

```powershell
docker ps
docker logs --tail 100 auth-service
```

Este procedimiento reduce el tiempo requerido para desplegar cambios pequeños.

---

# 7.21 Verificación de Puertos en Windows

Cuando un servicio no puede iniciarse porque el puerto está ocupado, se utiliza `netstat`.

Ejemplo para el puerto de Expo:

```powershell
netstat -ano | findstr :8081
```

Ejemplo para Auth Service:

```powershell
netstat -ano | findstr :8000
```

La última columna muestra el identificador del proceso, denominado PID.

Para finalizar el proceso:

```powershell
taskkill /PID NUMERO_PID /F
```

Ejemplo:

```powershell
taskkill /PID 3976 /F
```

Este procedimiento fue utilizado cuando Metro Bundler permanecía activo después de cerrar Expo.

---

# 7.22 Validación del Auth Service

El flujo mínimo de pruebas debe seguir este orden:

1. Registrar un usuario.
2. Iniciar sesión.
3. Copiar el token JWT.
4. Consultar el usuario autenticado.
5. Verificar la inscripción automática.

En Swagger, el registro debe devolver normalmente el código:

```text
201 Created
```

Un error:

```text
422 Unprocessable Entity
```

indica que los datos enviados no cumplen las validaciones del esquema Pydantic.

En el proyecto, el campo `cycle` debe enviarse como un número entero entre 1 y 10.

Ejemplo válido:

```json
{
  "full_name": "Usuario de Prueba",
  "email": "usuario@autonoma.edu.pe",
  "password": "ClaveSegura123",
  "career": "Ingeniería de Sistemas",
  "cycle": 10
}
```

No debe enviarse el ciclo como texto:

```json
{
  "cycle": "Décimo ciclo"
}
```

---

# 7.23 Verificación de la Inscripción Automática

Después de registrar un nuevo usuario, se debe comprobar que fueron creadas sus relaciones académicas.

La verificación puede realizarse desde el editor SQL de Supabase.

```sql
SELECT
    u.id,
    u.full_name,
    u.email,
    u.cycle
FROM users u
WHERE u.email = 'usuario@autonoma.edu.pe';
```

Luego consultar sus cursos:

```sql
SELECT
    sc.*
FROM student_courses sc
WHERE sc.student_id = 'ID_DEL_USUARIO';
```

La inscripción automática depende de la existencia previa de secciones para los cursos correspondientes al ciclo seleccionado.

Si el usuario se crea correctamente pero no aparecen cursos, debe revisarse:

- El valor del ciclo registrado.
- Los cursos de ese ciclo.
- Las secciones existentes.
- La consulta SQL de `enrollment_service.py`.
- Los logs del Auth Service.

La lógica fue diseñada para que una falla en la inscripción no elimine al usuario ni interrumpa completamente el registro. En ese escenario, el usuario permanece creado y el error queda registrado en los logs.

---

# 7.24 Ejecución del Frontend con Expo

La aplicación móvil debe iniciarse desde la carpeta del frontend.

Ruta referencial:

```text
frontend/mobile-app
```

En PowerShell:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\frontend\mobile-app
```

Instalar dependencias cuando se ejecuta por primera vez:

```powershell
npm install
```

Iniciar Expo limpiando la caché:

```powershell
npx expo start --clear --lan
```

El parámetro `--clear` elimina la caché de Metro Bundler.

El parámetro `--lan` permite que el dispositivo móvil se conecte mediante la red local.

La computadora y el celular deben encontrarse conectados a la misma red Wi-Fi.

---

# 7.25 Dirección IP Local

Para identificar la dirección IPv4 de la computadora se utiliza:

```powershell
ipconfig
```

Se debe seleccionar la dirección IPv4 del adaptador conectado a Internet.

No deben utilizarse normalmente direcciones pertenecientes a:

- VirtualBox.
- VMware.
- WSL.
- Docker.
- Adaptadores desconectados.

Ejemplo de dirección LAN:

```text
192.168.18.16
```

La API local puede configurarse utilizando esta dirección:

```text
http://192.168.18.16:8000
```

No debe utilizarse `localhost` desde el celular, porque en ese contexto `localhost` representa al propio dispositivo móvil y no a la computadora.

---

# 7.26 Configuración de la URL del Backend

La aplicación utiliza una variable de entorno para definir la dirección base del backend.

En producción se configuró:

```env
EXPO_PUBLIC_API_BASE_URL=http://54.221.99.50
```

Para desarrollo local puede utilizarse una dirección como:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.18.16
```

Después de modificar una variable de entorno de Expo se debe reiniciar Metro Bundler:

```powershell
npx expo start --clear --lan
```

No basta con actualizar la aplicación desde el celular, debido a que las variables se cargan durante el inicio del proceso de Expo.

---

# 7.27 Validaciones del Frontend

Antes de ejecutar el frontend se recomienda validar TypeScript y ESLint.

```powershell
npm run typecheck
```

```powershell
npm run lint
```

Si ambos comandos finalizan sin errores, se puede iniciar Expo.

Estas validaciones también forman parte del flujo de integración continua configurado en GitHub Actions mediante el archivo:

```text
.github/workflows/mobile-ci.yml
```

El flujo utiliza Node.js 20 y ejecuta:

```text
npm ci
npm run typecheck
npm run lint
```

---

# 7.28 Prueba Funcional Completa

La prueba local completa debe realizarse en el siguiente orden:

1. Confirmar que Supabase se encuentre disponible.
2. Iniciar los seis microservicios.
3. Verificar sus endpoints de salud o documentación.
4. Iniciar Expo.
5. Abrir la aplicación en Expo Go.
6. Registrar un usuario.
7. Iniciar sesión.
8. Confirmar la redirección al Home.
9. Revisar los cursos matriculados.
10. Consultar la malla curricular.
11. Consultar docentes.
12. Revisar pagos.
13. Enviar una pregunta al chatbot.
14. Revisar el historial de conversaciones.

Esta prueba valida la comunicación entre:

```text
Aplicación móvil
    ↓
Backend
    ↓
Supabase
    ↓
Gemini
```

---

# 7.29 Cierre del Entorno Local

Para detener Expo se utiliza:

```text
Ctrl + C
```

Para cerrar cada microservicio ejecutado con Uvicorn:

```text
Ctrl + C
```

Para detener los contenedores:

```powershell
docker compose down
```

Si algún proceso permanece utilizando un puerto, debe localizarse mediante `netstat` y finalizarse con `taskkill`.

---

# 7.30 Resultado Esperado

Al finalizar este procedimiento, el entorno local debe cumplir las siguientes condiciones:

- Los microservicios responden correctamente.
- La conexión con Supabase está activa.
- El usuario puede registrarse e iniciar sesión.
- Los cursos se asignan automáticamente según el ciclo.
- La aplicación móvil puede consumir el backend.
- El chatbot puede comunicarse con Gemini.
- Los módulos académicos muestran información sin errores.

Con estas validaciones se considera completada la ejecución local de Academic Chatbot Platform.

---

# CAPÍTULO 8. CONFIGURACIÓN DEL FRONTEND MÓVIL

# 8.1 Introducción

El frontend de Academic Chatbot Platform fue desarrollado como una aplicación móvil utilizando React Native, TypeScript, Expo SDK 54 y Expo Router.

La aplicación permite que el estudiante acceda a las funciones proporcionadas por los microservicios desde un dispositivo Android.

El frontend implementa:

- Registro.
- Inicio de sesión.
- Protección de rutas.
- Pantalla principal.
- Navegación hacia módulos.
- Consumo de APIs REST.
- Gestión local de la sesión.
- Visualización de información académica.
- Interacción con el chatbot.

La aplicación fue probada inicialmente mediante Expo Go y posteriormente compilada como un archivo APK para su instalación directa.

---

# 8.2 Tecnologías del Frontend

Las tecnologías principales son:

| Tecnología | Uso |
|---|---|
| React Native | Desarrollo de la interfaz móvil |
| Expo SDK 54 | Entorno de desarrollo y compilación |
| TypeScript | Tipado estático |
| Expo Router | Navegación basada en archivos |
| Context API | Administración de autenticación |
| Fetch o cliente HTTP | Consumo de servicios REST |
| Expo Go | Pruebas durante el desarrollo |
| EAS Build | Generación del APK |

---

# 8.3 Estructura Principal

La aplicación utiliza una estructura basada en funcionalidades y rutas.

```text
frontend/mobile-app/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   │
│   │   ├── (protected)/
│   │   │   └── home.tsx
│   │   │
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── features/
│   │   └── auth/
│   │       ├── context/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   │
│   └── shared/
│       ├── components/
│       └── theme/
│
├── assets/
├── package.json
├── tsconfig.json
├── app.json
└── .env
```

La estructura puede variar ligeramente conforme se incorporen nuevas pantallas, pero el flujo principal se mantiene bajo `src/app`.

---

# 8.4 Navegación con Expo Router

Expo Router utiliza la estructura de archivos para definir las rutas.

El archivo:

```text
src/app/index.tsx
```

representa la ruta inicial.

Los grupos:

```text
(auth)
(protected)
```

organizan pantallas sin incluir el nombre del grupo en la URL lógica.

El grupo `(auth)` contiene las pantallas públicas:

- Login.
- Registro.

El grupo `(protected)` contiene las pantallas que requieren una sesión válida.

El archivo `_layout.tsx` administra la estructura principal de navegación y los proveedores globales.

---

# 8.5 Flujo Inicial

El flujo implementado es:

```text
index.tsx
    ↓
login.tsx
    ↓
signIn()
    ↓
home.tsx
```

Cuando el usuario abre la aplicación, `index.tsx` evalúa la sesión disponible.

Si no existe una sesión válida, redirige hacia:

```text
/(auth)/login
```

Después de un inicio de sesión correcto, el usuario es enviado hacia:

```text
/(protected)/home
```

Las rutas protegidas no deben mostrarse a usuarios sin token.

---

# 8.6 Contexto de Autenticación

La autenticación se administra mediante Context API.

El contexto concentra:

- Usuario autenticado.
- Token JWT.
- Estado de carga.
- Inicio de sesión.
- Cierre de sesión.
- Restauración de la sesión.

Este diseño evita transmitir manualmente el token y la información del usuario entre todas las pantallas.

Las pantallas consumen el contexto mediante un hook definido dentro de:

```text
features/auth/hooks
```

La lógica de consumo del backend se mantiene separada dentro de:

```text
features/auth/services
```

---

# 8.7 Pantalla de Inicio de Sesión

La pantalla:

```text
src/app/(auth)/login.tsx
```

permite ingresar:

- Correo.
- Contraseña.

Al enviar el formulario, la aplicación:

1. Valida que los campos estén completos.
2. Envía las credenciales al Auth Service.
3. Recibe el token JWT.
4. Consulta o almacena la información del usuario.
5. Actualiza el contexto de autenticación.
6. Redirige hacia el Home.

Los errores del backend deben mostrarse mediante mensajes claros, evitando exponer detalles técnicos al usuario.

---

# 8.8 Pantalla de Registro

La pantalla:

```text
src/app/(auth)/register.tsx
```

permite registrar los datos académicos y personales requeridos por el Auth Service.

Entre los campos utilizados se encuentran:

- Nombre completo.
- Correo.
- Contraseña.
- Universidad.
- Carrera.
- Ciclo académico.

Los campos de selección utilizan un valor inicial como:

```text
—Seleccione—
```

El ciclo enviado al backend debe convertirse en un número entero entre 1 y 10.

Después de un registro exitoso, el backend crea al usuario e intenta inscribirlo automáticamente en los cursos correspondientes a su ciclo.

El frontend no ejecuta la inscripción; únicamente envía correctamente los datos del registro.

---

# 8.9 Pantalla Home

La pantalla:

```text
src/app/(protected)/home.tsx
```

constituye el punto principal de navegación después del inicio de sesión.

El saludo se genera dinámicamente utilizando la información del usuario autenticado.

No debe utilizarse un nombre escrito directamente en el código, como:

```text
Hola, Miguel
```

Debe generarse a partir del perfil:

```text
Hola, {nombreDelUsuario}
```

Desde el Home se accede a los módulos:

- Estudio.
- Cursos.
- Pagos.
- Preguntas.
- Docentes.

Cada módulo dirige al usuario hacia la pantalla correspondiente.

---

# 8.10 Configuración de Variables de Entorno

La URL del backend se define mediante:

```env
EXPO_PUBLIC_API_BASE_URL=http://54.221.99.50
```

El archivo:

```text
src/config/env.ts
```

centraliza el acceso a esta variable para evitar direcciones repetidas dentro de los servicios.

Ejemplo conceptual:

```typescript
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
```

Las variables que deben llegar al código de Expo requieren el prefijo:

```text
EXPO_PUBLIC_
```

No deben almacenarse claves privadas en variables públicas del frontend.

La API Key de Gemini pertenece únicamente al Questions Service y nunca debe incorporarse en la aplicación móvil.

---

# 8.11 Comunicación con el Backend

Las solicitudes al backend deben incluir:

- URL base.
- Ruta del endpoint.
- Método HTTP.
- Encabezados.
- Token JWT cuando sea necesario.
- Cuerpo JSON cuando corresponda.

Ejemplo conceptual de una solicitud protegida:

```typescript
const response = await fetch(`${API_BASE_URL}/ruta`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

La implementación debe verificar `response.ok` antes de procesar el contenido.

Cuando el backend devuelva un error, el frontend debe mostrar un mensaje controlado y conservar la estabilidad de la pantalla.

---

# 8.12 Estado Actual del Frontend

En la versión actual se encuentran operativos:

- Pantalla de login.
- Pantalla de registro.
- Redirección protegida.
- Home con saludo dinámico.
- Navegación hacia módulos.
- Consumo del backend desplegado.
- Chatbot académico.
- Generación e instalación del APK.

La aplicación utiliza actualmente la instancia desplegada en AWS mediante:

```text
http://54.221.99.50
```

Esto permite utilizar el APK sin depender de que la computadora de desarrollo permanezca encendida.

---

# 8.13 Ejecución con Expo Go

Para iniciar la aplicación:

```powershell
cd C:\Users\Miguel\Desktop\10mo\academic-chatbot-platform\frontend\mobile-app
npx expo start --clear --lan
```

Luego se debe:

1. Abrir Expo Go en el dispositivo Android.
2. Escanear el código QR.
3. Esperar la descarga del bundle.
4. Validar el inicio de la aplicación.

El celular y la computadora deben estar en la misma red cuando se utiliza el modo LAN.

---

# 8.14 Problemas de Caché

Cuando Expo muestra una pantalla azul, errores antiguos o cambios que no se reflejan, se debe limpiar la caché.

```powershell
npx expo start --clear --lan
```

Si el error persiste, puede eliminarse la carpeta `.expo`:

```powershell
Remove-Item -Recurse -Force .expo
```

Posteriormente:

```powershell
npx expo start --clear --lan
```

Cuando existen problemas relacionados con dependencias:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npx expo start --clear --lan
```

Este procedimiento debe utilizarse únicamente cuando la limpieza normal no resuelve el problema.

---

# 8.15 Conflicto del Puerto 8081

Metro Bundler utiliza normalmente el puerto `8081`.

Para revisar si está ocupado:

```powershell
netstat -ano | findstr :8081
```

Para finalizar el proceso:

```powershell
taskkill /PID NUMERO_PID /F
```

Después se reinicia Expo:

```powershell
npx expo start --clear --lan
```

---

# 8.16 Validación Antes de Compilar

Antes de generar una nueva versión se debe ejecutar:

```powershell
npm run typecheck
npm run lint
```

También se debe comprobar:

- Login.
- Registro.
- Navegación.
- URL del backend.
- Sesión.
- Chatbot.
- Cursos.
- Docentes.
- Pagos.
- Ausencia de errores en consola.

No se recomienda generar una compilación cuando existen errores de TypeScript o ESLint.

---

# 8.17 Seguridad del Frontend

El frontend no debe contener:

- Contraseñas.
- Credenciales de Supabase.
- Claves privadas.
- API Key de Gemini.
- Secretos JWT.
- Cadenas de conexión PostgreSQL.

La aplicación móvil únicamente necesita:

- URL pública del backend.
- Token JWT recibido después del login.
- Información necesaria para mostrar la interfaz.

Toda operación sensible debe permanecer en los microservicios.

---

# 8.18 Resultado Esperado

Después de configurar correctamente el frontend:

- La aplicación inicia mediante Expo Go.
- El usuario puede registrarse.
- El usuario puede iniciar sesión.
- Las rutas protegidas funcionan.
- El Home muestra información dinámica.
- Los módulos consumen el backend.
- El chatbot genera respuestas.
- La aplicación puede compilarse como APK.

Con esta configuración queda completada la documentación técnica del frontend móvil de Academic Chatbot Platform.


# CAPÍTULO 9. USO DE LA APLICACIÓN MÓVIL (APK)

## 9.1 Introducción

Una vez finalizado el desarrollo del frontend, la aplicación fue compilada como un archivo APK para permitir su instalación en dispositivos Android sin depender de Expo Go.

Esta versión consume directamente el backend desplegado en AWS, por lo que únicamente requiere conexión a Internet para funcionar.

---

# 9.2 Instalación del APK

Copiar el archivo APK al dispositivo Android.

Abrir el archivo desde el administrador de archivos.

Si Android bloquea la instalación, habilitar temporalmente la opción:

```text
Permitir instalar aplicaciones de fuentes desconocidas
```

Aceptar la instalación.

Una vez finalizado el proceso aparecerá el icono de Academic Chatbot Platform.

---

# 9.3 Inicio de la Aplicación

Al abrir la aplicación se muestra la pantalla de inicio de sesión.

El usuario dispone de dos opciones:

- Iniciar sesión.
- Crear una nueva cuenta.

Si todavía no posee una cuenta deberá completar primero el proceso de registro.

---

# 9.4 Registro de Usuario

El formulario solicita la siguiente información:

- Nombre completo.
- Correo electrónico.
- Contraseña.
- Universidad.
- Carrera.
- Ciclo académico.

Después de enviar la información:

1. El frontend valida los datos.
2. Se envía la solicitud al Auth Service.
3. Se crea el usuario.
4. Se cifran las credenciales.
5. Se registra el estudiante.
6. Se realiza la inscripción automática de cursos.
7. El sistema confirma el registro.

---

# 9.5 Inicio de Sesión

El usuario introduce:

- Correo.
- Contraseña.

Si las credenciales son válidas:

- El Auth Service genera un JWT.
- El frontend almacena temporalmente la sesión.
- El usuario es redirigido al Home.

Si las credenciales son incorrectas se muestra un mensaje indicando el error sin revelar información sensible.

---

# 9.6 Pantalla Principal

Después de autenticarse correctamente, el estudiante accede al Home.

Desde esta pantalla puede ingresar a:

- Estudio.
- Cursos.
- Docentes.
- Pagos.
- Chat IA.

Cada módulo consume el microservicio correspondiente mediante el API Gateway.

---

# 9.7 Consulta de la Malla Curricular

El módulo Estudio muestra la estructura académica registrada en la base de datos.

El estudiante puede visualizar:

- Cursos.
- Créditos.
- Ciclos.
- Prerrequisitos.

La información es obtenida desde Study Service.

---

# 9.8 Consulta de Cursos

El módulo Cursos muestra únicamente las asignaturas matriculadas por el estudiante autenticado.

La información proviene de:

- student_courses
- course_sections
- courses

Si el usuario acaba de registrarse, los cursos ya deben encontrarse asignados automáticamente.

---

# 9.9 Consulta de Docentes

El módulo Docentes obtiene la información registrada en Teachers Service.

Cada docente puede visualizarse junto con los cursos que tiene asignados.

---

# 9.10 Consulta de Pagos

El módulo Pagos presenta las mensualidades registradas para el estudiante.

La información incluye:

- Concepto.
- Estado.
- Fecha.
- Monto.

Actualmente esta funcionalidad es informativa y no procesa pagos reales.

---

# 9.11 Chat Académico

El módulo Preguntas constituye la funcionalidad principal del proyecto.

El flujo implementado es:

1. El estudiante escribe una pregunta.
2. La aplicación envía la consulta.
3. Questions Service procesa la solicitud.
4. Gemini genera la respuesta.
5. El historial es almacenado.
6. La respuesta aparece en pantalla.

---

# 9.12 Historial

Cada conversación queda almacenada en la base de datos.

Esto permite consultar preguntas realizadas anteriormente sin perder el contexto.

---

# 9.13 Cierre de Sesión

Cuando el usuario selecciona la opción Cerrar sesión:

- Se elimina el JWT almacenado.
- Se limpia el contexto de autenticación.
- Se redirige nuevamente al Login.

Con ello finaliza la sesión de manera segura.

---

# CAPÍTULO 10. DESPLIEGUE EN AWS

## 10.1 Introducción

La versión final de Academic Chatbot Platform fue desplegada sobre Amazon Web Services utilizando una instancia EC2 con Ubuntu Server.

El despliegue se realizó mediante Docker Compose, permitiendo ejecutar todos los microservicios dentro de contenedores independientes.

---

# 10.2 Arquitectura de Despliegue

El servidor contiene los siguientes componentes:

```text
Internet
      │
      ▼
AWS EC2 Ubuntu
      │
      ▼
Nginx
      │
 ┌────┼────────────────────┐
 │    │    │    │    │     │
Auth Study Courses Questions Payments Teachers
      │
      ▼
Supabase PostgreSQL
```

Toda la comunicación externa ingresa primero por Nginx.

---

# 10.3 Preparación del Servidor

Antes del despliegue se instaló:

- Docker.
- Docker Compose.
- Git.

Posteriormente se clonó el repositorio del proyecto.

```bash
git clone <repositorio>
```

Ingresar al proyecto.

```bash
cd academic-chatbot-platform
```

---

# 10.4 Variables de Entorno

Cada microservicio utiliza su propio archivo `.env`.

Entre las variables configuradas se encuentran:

```env
DATABASE_URL=

SECRET_KEY=

ACCESS_TOKEN_EXPIRE_MINUTES=

GEMINI_API_KEY=

RABBITMQ_URL=
```

Las credenciales nunca deben almacenarse dentro del repositorio.

---

# 10.5 Docker Compose de Producción

Para producción se utiliza:

```text
docker-compose.prod.yml
```

Este archivo define:

- Microservicios.
- Redes.
- Variables.
- Volúmenes.
- Reinicio automático.
- API Gateway.

---

# 10.6 Construcción de Contenedores

Desde la raíz del proyecto:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Docker construye todas las imágenes y posteriormente inicia los contenedores.

---

# 10.7 Verificación

Verificar:

```bash
docker ps
```

Todos los servicios deben aparecer con estado:

```text
Up
```

---

# 10.8 Logs

Para revisar los registros:

```bash
docker compose logs
```

Logs en tiempo real:

```bash
docker compose logs -f
```

Servicio específico:

```bash
docker logs auth-service
```

---

# 10.9 Actualización del Proyecto

Obtener cambios:

```bash
git pull
```

Reconstruir:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

No es necesario reinstalar dependencias manualmente.

---

# 10.10 Reinicio

Reiniciar un servicio:

```bash
docker restart auth-service
```

Reiniciar todos:

```bash
docker compose restart
```

---

# 10.11 Detener Servicios

```bash
docker compose down
```

Si se requiere eliminar también los volúmenes:

```bash
docker compose down -v
```

---

# 10.12 Nginx como API Gateway

Nginx centraliza todas las solicitudes HTTP provenientes de la aplicación móvil.

Cada ruta es redireccionada hacia el microservicio correspondiente.

Esta configuración evita exponer múltiples puertos al cliente.

---

# 10.13 Comunicación con Supabase

Todos los microservicios mantienen una conexión independiente hacia PostgreSQL utilizando SQLAlchemy.

No existe comunicación directa entre la aplicación móvil y la base de datos.

Toda operación pasa obligatoriamente por los microservicios.

---

# 10.14 Seguridad

Durante el despliegue se implementaron las siguientes medidas:

- JWT para autenticación.
- Variables de entorno.
- Contraseñas cifradas.
- Separación entre frontend y backend.
- API Key protegida en el servidor.
- Base de datos inaccesible desde el cliente.

---

# 10.15 Resultado Esperado

Después del despliegue:

- Los contenedores permanecen activos.
- El backend responde correctamente.
- La aplicación móvil consume la API pública.
- Gemini procesa consultas.
- Supabase almacena toda la información.
- El sistema queda disponible para los usuarios finales.


# CAPÍTULO 11. DOCUMENTACIÓN DE LA API REST

## 11.1 Introducción

El backend de Academic Chatbot Platform expone una API REST construida mediante FastAPI. La aplicación móvil utiliza esta API para registrar usuarios, autenticar estudiantes, consultar información académica, obtener cursos matriculados, visualizar docentes y pagos, y enviar preguntas al chatbot.

Cada microservicio administra un conjunto específico de rutas. Durante el desarrollo local, los servicios pueden consumirse directamente mediante sus respectivos puertos. En producción, la aplicación utiliza una única dirección base administrada por Nginx.

La comunicación general sigue el siguiente flujo:

```text
Aplicación móvil
       │
       ▼
API Gateway Nginx
       │
       ├── Auth Service
       ├── Study Service
       ├── Courses Service
       ├── Questions Service
       ├── Payments Service
       └── Teachers Service
```

La aplicación móvil no accede directamente a Supabase ni a Gemini. Toda operación debe pasar por el backend.

---

## 11.2 Direcciones Base

### Entorno local

Durante la ejecución individual, cada microservicio utiliza su propio puerto:

| Microservicio | Dirección local |
|---|---|
| Auth Service | `http://localhost:8000` |
| Study Service | `http://localhost:8002` |
| Courses Service | `http://localhost:8003` |
| Questions Service | `http://localhost:8004` |
| Payments Service | `http://localhost:8005` |
| Teachers Service | `http://localhost:8006` |

Cuando el frontend se ejecuta desde un celular físico, no debe utilizarse `localhost`. Se debe emplear la dirección IPv4 del equipo de desarrollo.

Ejemplo:

```text
http://192.168.18.16:8000
```

### Entorno de producción

En producción, el frontend utiliza la dirección pública del servidor EC2:

```text
http://54.221.99.50
```

Nginx recibe las solicitudes y las redirige al microservicio correspondiente.

---

## 11.3 Prefijo de la API

El Auth Service utiliza el prefijo:

```text
/api/v1
```

Por lo tanto, una ruta definida como:

```text
/users/register
```

se consume mediante:

```text
/api/v1/users/register
```

Ejemplo local completo:

```text
http://localhost:8000/api/v1/users/register
```

El prefijo permite versionar la API y mantener compatibilidad cuando se incorporen modificaciones futuras.

---

## 11.4 Formato de Intercambio

La mayoría de los endpoints utilizan JSON.

Ejemplo de encabezado:

```http
Content-Type: application/json
```

Las rutas protegidas requieren además:

```http
Authorization: Bearer TOKEN_JWT
```

Ejemplo:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

El token no debe enviarse en la URL ni almacenarse directamente en el código fuente.

---

## 11.5 Códigos HTTP Utilizados

| Código | Significado |
|---|---|
| `200 OK` | Solicitud procesada correctamente |
| `201 Created` | Recurso creado correctamente |
| `400 Bad Request` | Solicitud inválida |
| `401 Unauthorized` | Credenciales o token inválido |
| `403 Forbidden` | Usuario sin autorización |
| `404 Not Found` | Recurso no encontrado |
| `409 Conflict` | Conflicto con información existente |
| `422 Unprocessable Entity` | Datos incompatibles con el esquema |
| `500 Internal Server Error` | Error interno del servidor |
| `502 Bad Gateway` | Nginx no pudo comunicarse con un servicio |
| `503 Service Unavailable` | Servicio temporalmente no disponible |

FastAPI genera normalmente el código `422` cuando falta un campo obligatorio o cuando el tipo de dato enviado no coincide con el esquema Pydantic.

---

# 11.6 Auth Service

El Auth Service administra el registro, inicio de sesión, validación del token y consulta del usuario autenticado.

Su dirección local es:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

---

## 11.6.1 Verificación de Salud

### Endpoint

```http
GET /health
```

### Descripción

Permite comprobar que el Auth Service se encuentra disponible.

### Solicitud

No requiere autenticación ni cuerpo.

```bash
curl http://localhost:8000/health
```

### Resultado esperado

```json
{
  "status": "healthy"
}
```

La estructura exacta de la respuesta depende de la implementación actual de `main.py`, pero debe confirmar que el servicio está activo.

---

## 11.6.2 Registro de Usuario

### Endpoint

```http
POST /api/v1/users/register
```

### Descripción

Registra un nuevo estudiante en la plataforma.

Durante esta operación el Auth Service:

1. Valida los datos enviados.
2. Comprueba que el correo no esté registrado.
3. Cifra la contraseña.
4. Crea el usuario en PostgreSQL.
5. Obtiene su identificador.
6. Ejecuta la inscripción automática.
7. Asocia al estudiante con los cursos de su ciclo.
8. Devuelve la información pública del usuario.

### Autenticación

No requiere token.

### Encabezado

```http
Content-Type: application/json
```

### Cuerpo de la solicitud

```json
{
  "full_name": "Usuario de Prueba",
  "email": "usuario@autonoma.edu.pe",
  "password": "ClaveSegura123",
  "career": "Ingeniería de Sistemas",
  "cycle": 10
}
```

Los nombres de los campos deben coincidir con el esquema Pydantic implementado en el Auth Service.

### Consideraciones

- `email` debe ser único.
- `password` se recibe como texto, pero nunca se almacena sin cifrar.
- `cycle` debe enviarse como número entero.
- `career` debe contener una carrera admitida por la aplicación.
- Los datos deben cumplir las validaciones definidas en el backend.

### Ejemplo incorrecto

```json
{
  "full_name": "",
  "email": "correo-invalido",
  "password": "123",
  "career": "Ingeniería de Sistemas",
  "cycle": "Décimo"
}
```

El campo `cycle` no debe enviarse como texto.

### Respuesta exitosa

Código esperado:

```text
201 Created
```

Ejemplo referencial:

```json
{
  "id": "UUID_DEL_USUARIO",
  "full_name": "Usuario de Prueba",
  "email": "usuario@autonoma.edu.pe",
  "role": "student",
  "career": "Ingeniería de Sistemas",
  "cycle": 10,
  "is_active": true
}
```

La contraseña nunca debe aparecer en la respuesta.

### Posibles errores

#### Correo ya registrado

```text
400 Bad Request
```

o:

```text
409 Conflict
```

#### Datos inválidos

```text
422 Unprocessable Entity
```

#### Error de base de datos

```text
500 Internal Server Error
```

### Ejemplo con cURL

```bash
curl -X POST "http://localhost:8000/api/v1/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Usuario de Prueba",
    "email": "usuario@autonoma.edu.pe",
    "password": "ClaveSegura123",
    "career": "Ingeniería de Sistemas",
    "cycle": 10
  }'
```

### Inscripción automática

Después de crear el usuario, el Auth Service busca los cursos correspondientes a su ciclo y genera los registros en `student_courses`.

La inscripción depende de que previamente existan:

- Cursos del ciclo.
- Secciones asociadas.
- Relaciones válidas entre cursos y secciones.

Si el usuario se registra, pero no aparecen cursos, debe revisarse el proceso de inscripción automática y los datos existentes en Supabase.

---

## 11.6.3 Inicio de Sesión

### Endpoint

```http
POST /api/v1/users/login
```

### Descripción

Valida las credenciales del usuario y genera un token JWT.

### Autenticación

No requiere token.

### Tipo de contenido

El endpoint utiliza `OAuth2PasswordRequestForm`, por lo que las credenciales deben enviarse como formulario:

```http
Content-Type: application/x-www-form-urlencoded
```

No deben enviarse como JSON, salvo que la implementación sea modificada posteriormente.

### Campos

| Campo | Contenido |
|---|---|
| `username` | Correo del usuario |
| `password` | Contraseña |
| `grant_type` | Puede enviarse vacío o como `password` |
| `scope` | Opcional |
| `client_id` | Opcional |
| `client_secret` | Opcional |

Aunque el campo se denomina `username`, el proyecto utiliza el correo electrónico.

### Ejemplo con cURL

```bash
curl -X POST "http://localhost:8000/api/v1/users/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=usuario@autonoma.edu.pe&password=ClaveSegura123"
```

### Respuesta exitosa

Código esperado:

```text
200 OK
```

Ejemplo:

```json
{
  "access_token": "TOKEN_JWT",
  "token_type": "bearer"
}
```

### Uso del token

El valor de `access_token` debe incluirse en las solicitudes protegidas:

```http
Authorization: Bearer TOKEN_JWT
```

### Credenciales incorrectas

Código esperado:

```text
401 Unauthorized
```

Ejemplo referencial:

```json
{
  "detail": "Incorrect email or password"
}
```

El sistema no debe informar si el error corresponde específicamente al correo o a la contraseña, debido a que ello facilitaría la enumeración de usuarios.

---

## 11.6.4 Consulta del Usuario Autenticado

### Endpoint

```http
GET /api/v1/users/me
```

### Descripción

Devuelve la información del usuario asociado al JWT enviado.

### Autenticación

Obligatoria.

### Encabezado

```http
Authorization: Bearer TOKEN_JWT
```

### Ejemplo con cURL

```bash
curl -X GET "http://localhost:8000/api/v1/users/me" \
  -H "Authorization: Bearer TOKEN_JWT"
```

### Respuesta exitosa

```json
{
  "id": "UUID_DEL_USUARIO",
  "full_name": "Usuario de Prueba",
  "email": "usuario@autonoma.edu.pe",
  "role": "student",
  "career": "Ingeniería de Sistemas",
  "cycle": 10,
  "is_active": true
}
```

### Token ausente

```text
401 Unauthorized
```

### Token vencido o inválido

```text
401 Unauthorized
```

La aplicación debe cerrar la sesión o solicitar una nueva autenticación cuando el token ya no sea válido.

---

## 11.6.5 Ruta de Prueba

El Auth Service contiene un router de prueba utilizado durante el desarrollo.

Su prefijo se encuentra asociado a:

```text
/api/v1/test
```

Esta ruta se utilizó para verificar el funcionamiento básico del enrutamiento y las dependencias del servicio.

No debe considerarse una funcionalidad principal de la aplicación ni utilizarse como parte del flujo productivo.

Si esta ruta ya no es necesaria, puede eliminarse antes de una liberación definitiva.

---

# 11.7 Funcionamiento del JWT

El Auth Service genera tokens utilizando el algoritmo:

```text
HS256
```

El campo principal utilizado dentro del token es:

```text
sub
```

En la implementación actual, `sub` contiene el correo electrónico del usuario.

Ejemplo conceptual del contenido:

```json
{
  "sub": "usuario@autonoma.edu.pe",
  "exp": 1784000000
}
```

El campo `exp` representa la fecha de expiración.

La duración se configura mediante:

```env
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Cuando un servicio recibe una solicitud protegida:

1. Lee el encabezado `Authorization`.
2. Extrae el token.
3. Verifica la firma.
4. Valida la expiración.
5. Obtiene el correo desde `sub`.
6. Busca al usuario.
7. Permite o rechaza la operación.

---

# 11.8 Protección de Endpoints

Las rutas públicas son aquellas necesarias antes de tener una sesión.

Ejemplos:

```text
POST /api/v1/users/register
POST /api/v1/users/login
GET /health
```

Las rutas privadas requieren JWT.

Ejemplos:

```text
GET /api/v1/users/me
```

Los endpoints de cursos, pagos, historial y consultas académicas deben identificar al usuario mediante el token y no mediante un identificador enviado libremente por el frontend.

Esto evita que un estudiante modifique la solicitud para consultar información perteneciente a otro usuario.

---

# 11.9 Consumo desde el Frontend

## Registro

Ejemplo conceptual:

```typescript
const response = await fetch(
  `${API_BASE_URL}/api/v1/users/register`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      password,
      career,
      cycle: Number(cycle),
    }),
  }
);
```

Antes de enviar la solicitud, el frontend debe convertir el ciclo a número.

---

## Inicio de sesión

Debido al uso de `OAuth2PasswordRequestForm`, el frontend debe enviar `URLSearchParams`.

```typescript
const body = new URLSearchParams();

body.append("username", email);
body.append("password", password);

const response = await fetch(
  `${API_BASE_URL}/api/v1/users/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  }
);
```

Enviar las credenciales como JSON puede producir un error `422`.

---

## Consulta del perfil

```typescript
const response = await fetch(
  `${API_BASE_URL}/api/v1/users/me`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
```

El frontend debe verificar que exista un token antes de ejecutar la solicitud.

---

# 11.10 Manejo de Errores en el Frontend

El frontend debe diferenciar entre errores de validación, autenticación, conectividad y servidor.

Ejemplo:

```typescript
if (!response.ok) {
  const errorData = await response.json().catch(() => null);

  throw new Error(
    errorData?.detail ?? "No fue posible completar la operación."
  );
}
```

No se debe asumir que todas las respuestas de error contienen JSON válido.

También debe controlarse el error de red:

```typescript
try {
  const response = await fetch(url, options);
} catch {
  throw new Error(
    "No se pudo establecer comunicación con el servidor."
  );
}
```

---

# 11.11 Validación mediante Swagger

Swagger permite probar las rutas directamente desde el navegador.

Para Auth Service:

```text
http://localhost:8000/docs
```

Para probar una ruta protegida:

1. Ejecutar `/api/v1/users/login`.
2. Copiar `access_token`.
3. Seleccionar `Authorize`.
4. Ingresar el token.
5. Ejecutar `/api/v1/users/me`.

Dependiendo de la interfaz, Swagger puede requerir únicamente el token o agregar automáticamente el prefijo `Bearer`.

---

# 11.12 Validación mediante Postman

En Postman se debe crear una colección por microservicio.

Ejemplo:

```text
Academic Chatbot Platform
├── Auth Service
│   ├── Health
│   ├── Register
│   ├── Login
│   └── Me
├── Study Service
├── Courses Service
├── Questions Service
├── Payments Service
└── Teachers Service
```

Variables recomendadas:

```text
base_url
auth_token
test_email
test_password
```

Ejemplo:

```text
base_url = http://localhost:8000
```

Después del login, el token puede almacenarse en una variable de colección para reutilizarlo en las solicitudes protegidas.

---

# 11.13 Recomendaciones de Seguridad

La API debe mantener las siguientes restricciones:

- No devolver contraseñas.
- No registrar contraseñas en logs.
- No exponer `SECRET_KEY`.
- No incluir `DATABASE_URL` en respuestas.
- No enviar `GEMINI_API_KEY` al frontend.
- No aceptar identificadores de usuario sin validarlos.
- Verificar el JWT en todas las operaciones privadas.
- Utilizar HTTPS en un despliegue público definitivo.
- Limitar los orígenes permitidos mediante CORS.
- Mantener las variables sensibles fuera de GitHub.

La versión actual utiliza HTTP sobre la IP pública del servidor. Para un entorno definitivo se recomienda configurar un dominio y certificado TLS.

---

# 11.14 Estado de la API de Autenticación

Las funciones verificadas dentro del flujo actual son:

- Registro de usuario.
- Validación de datos.
- Cifrado de contraseña.
- Inicio de sesión.
- Generación de JWT.
- Consulta del usuario autenticado.
- Inscripción automática por ciclo.
- Consumo desde la aplicación móvil.

Estas operaciones forman la base de seguridad utilizada por el resto de los microservicios.

# 11.15 Study Service

El Study Service administra las funcionalidades relacionadas con la información académica utilizada por el módulo Estudio de la aplicación móvil.

Su archivo principal se encuentra en:

```text
backend/services/study-service/app/main.py
```

La aplicación FastAPI se crea utilizando los valores definidos en el archivo de configuración:

```python
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)
```

El nombre y la versión del servicio no están escritos directamente en `main.py`, sino que se obtienen desde:

```text
app/config/settings.py
```

Esta separación permite modificar la configuración sin alterar el punto de entrada del servicio.

---

## 11.15.1 Registro del Router

El Study Service importa su router principal desde:

```text
app/routes/study_route.py
```

La importación utilizada es:

```python
from app.routes.study_route import router as study_router
```

Posteriormente, el router se registra mediante:

```python
app.include_router(
    study_router,
    prefix=settings.API_V1_PREFIX,
)
```

Esto significa que todos los endpoints definidos dentro de `study_route.py` reciben automáticamente el prefijo configurado en:

```text
settings.API_V1_PREFIX
```

Por ejemplo, si la variable tiene el siguiente valor:

```env
API_V1_PREFIX=/api/v1
```

y dentro del router existe una ruta:

```python
@router.get("/study/curriculum")
```

la dirección final será:

```text
/api/v1/study/curriculum
```

La ruta exacta no debe deducirse únicamente desde `main.py`, debido a que depende de los valores y decoradores definidos dentro de `study_route.py`.

---

## 11.15.2 Endpoint Raíz

### Endpoint

```http
GET /
```

### Descripción

Comprueba que el Study Service se encuentra activo.

Esta ruta se declara directamente en `main.py` y no utiliza el prefijo de la API.

### Autenticación

No requiere autenticación.

### Parámetros

No requiere parámetros.

### Ejemplo local

```text
http://localhost:8002/
```

### Ejemplo con cURL

```bash
curl http://localhost:8002/
```

### Respuesta

```json
{
  "service": "study-service",
  "status": "running",
  "docs": "/docs"
}
```

### Interpretación

La respuesta confirma:

- El nombre del microservicio.
- Que la aplicación se encuentra en ejecución.
- La ubicación de la documentación Swagger.

El campo:

```json
"docs": "/docs"
```

indica que la documentación interactiva puede consultarse mediante:

```text
http://localhost:8002/docs
```

---

## 11.15.3 Documentación Automática

FastAPI genera automáticamente la documentación Swagger UI:

```text
http://localhost:8002/docs
```

También genera la documentación ReDoc:

```text
http://localhost:8002/redoc
```

Estas interfaces muestran los endpoints registrados por `study_router`, incluyendo:

- Método HTTP.
- Ruta completa.
- Parámetros.
- Esquemas de entrada.
- Esquemas de respuesta.
- Códigos HTTP.

---

## 11.15.4 Flujo de Inicialización

Cuando se inicia el Study Service, se ejecuta el siguiente flujo:

1. Python carga `app/main.py`.
2. Se importa la configuración desde `app.config.settings`.
3. Se importa el router desde `app.routes.study_route`.
4. Se crea la instancia de FastAPI.
5. Se registra el router con el prefijo configurado.
6. Se habilita el endpoint raíz.
7. Uvicorn expone la aplicación en el puerto asignado.

El comando de ejecución utilizado es:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8002
```

---

## 11.15.5 Validación del Servicio

Después de iniciar el servicio se debe comprobar primero la ruta raíz:

```text
http://localhost:8002/
```

La respuesta esperada es:

```json
{
  "service": "study-service",
  "status": "running",
  "docs": "/docs"
}
```

Luego se debe abrir Swagger:

```text
http://localhost:8002/docs
```

Si la ruta raíz funciona, pero Swagger no muestra endpoints académicos, debe revisarse:

- La importación de `study_router`.
- La creación de `router` en `study_route.py`.
- Los decoradores utilizados en las rutas.
- El valor de `API_V1_PREFIX`.
- Los errores mostrados en la terminal.


# 11.16 Endpoints del Study Service

El Study Service concentra toda la lógica relacionada con la planificación académica del estudiante.

A diferencia del Auth Service, este microservicio no administra autenticación ni credenciales. Su responsabilidad consiste en consultar la información académica almacenada en Supabase y devolverla organizada para ser consumida por la aplicación móvil.

Todos sus endpoints utilizan el prefijo:

```text
/api/v1/study
```

por lo que una ruta definida como:

```text
/curriculum
```

es publicada como:

```text
/api/v1/study/curriculum
```

---

# 11.16.1 Health Check

### Endpoint

```http
GET /api/v1/study/health
```

### Objetivo

Permite verificar rápidamente que el microservicio se encuentra operativo.

Esta ruta es utilizada durante las pruebas de desarrollo y monitoreo del sistema.

### Parámetros

No requiere parámetros.

### Respuesta

```json
{
    "service": "study-service",
    "status": "healthy"
}
```

### Código esperado

```text
200 OK
```

---

# 11.16.2 Verificación de Base de Datos

### Endpoint

```http
GET /api/v1/study/db-check
```

### Objetivo

Comprueba que el microservicio mantiene conexión con Supabase PostgreSQL.

Internamente ejecuta una consulta extremadamente simple:

```sql
SELECT 1 AS ok;
```

Esta consulta únicamente confirma que la conexión puede establecerse correctamente.

### Parámetros

No requiere.

### Respuesta

```json
{
    "database": "connected",
    "result": {
        "ok": 1
    }
}
```

### Flujo interno

1. Obtiene la sesión SQLAlchemy.
2. Ejecuta `SELECT 1`.
3. Convierte el resultado en un diccionario.
4. Devuelve el estado de la conexión.

Este endpoint resulta útil para diagnosticar problemas relacionados con Supabase antes de ejecutar consultas más complejas.

---

# 11.16.3 Consulta de la Malla Curricular

### Endpoint

```http
GET /api/v1/study/curriculum
```

### Objetivo

Obtiene la lista de cursos pertenecientes a un determinado plan curricular.

Puede consultarse toda la carrera o únicamente un ciclo específico.

### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| career | String | Sí | Nombre de la carrera |
| cycle | Integer | No | Ciclo académico entre 1 y 10 |
| curriculum_code | String | No | Código del plan curricular. Valor por defecto: C2 |

### Ejemplo

```http
GET /api/v1/study/curriculum?career=Ingeniería%20de%20Sistemas&cycle=5
```

### Validaciones

El backend verifica:

- La carrera debe contener al menos tres caracteres.
- El ciclo debe encontrarse entre 1 y 10.
- El código curricular no puede estar vacío.

### Flujo interno

1. Se reciben los parámetros.
2. Se crea una instancia de `StudyService`.
3. Se consulta la base de datos.
4. Se filtran los cursos.
5. Se devuelve una lista ordenada.

### Respuesta

Devuelve una colección de objetos `CurriculumResponse`.

Cada elemento representa un curso perteneciente al plan curricular solicitado.

---

# 11.16.4 Consulta Completa del Plan Curricular

### Endpoint

```http
GET /api/v1/study/curriculum/full
```

### Objetivo

Obtiene la estructura completa del plan curricular.

A diferencia del endpoint anterior, este devuelve toda la organización académica agrupada dentro de un único objeto.

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| career | String |
| curriculum_code | String |

### Flujo

1. Valida los parámetros.
2. Consulta toda la carrera.
3. Agrupa la información.
4. Devuelve un objeto `FullCurriculumResponse`.

Este endpoint es utilizado cuando la aplicación necesita mostrar toda la malla curricular sin realizar múltiples consultas.

---

# 11.16.5 Ruta de Especialización

### Endpoint

```http
GET /api/v1/study/specialization-path
```

### Objetivo

Sugiere una ruta académica según el área profesional seleccionada por el estudiante.

Entre las áreas admitidas se encuentran:

- Inteligencia Artificial
- Cloud Computing
- DevOps
- Backend
- Ciberseguridad
- Redes

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| area | String |
| career | String |
| curriculum_code | String |

### Flujo

1. El usuario selecciona un área.
2. El servicio consulta los cursos relacionados.
3. Organiza los cursos por prioridad.
4. Devuelve la ruta recomendada.

### Respuesta

Objeto:

```text
SpecializationPathResponse
```

---

# 11.16.6 Próximo Ciclo Recomendado

### Endpoint

```http
GET /api/v1/study/next-cycle/{user_id}
```

### Objetivo

Obtiene los cursos que el estudiante debería matricular en el siguiente ciclo académico.

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| user_id | Integer |

### Flujo interno

1. Busca al estudiante.
2. Consulta los cursos aprobados.
3. Evalúa los prerrequisitos.
4. Determina los cursos habilitados.
5. Devuelve la recomendación.

La respuesta utiliza el esquema:

```text
NextCycleResponse
```

---

# 11.16.7 Consulta de Prerrequisitos

### Endpoint

```http
GET /api/v1/study/course-prerequisites/{course_reference}
```

### Objetivo

Obtiene todos los prerrequisitos asociados a un curso.

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| course_reference | String |
| career | String |
| curriculum_code | String |

### Ejemplo

```http
GET /api/v1/study/course-prerequisites/IF085
```

### Flujo

1. Localiza el curso.
2. Consulta sus relaciones.
3. Obtiene todos los cursos prerrequisito.
4. Devuelve la información organizada.

### Respuesta

```text
CoursePrerequisitesResponse
```

---

# 11.16.8 Cursos que Desbloquea

### Endpoint

```http
GET /api/v1/study/course-unlocks/{course_reference}
```

### Objetivo

Indica qué asignaturas podrán cursarse después de aprobar una determinada materia.

Es la operación inversa del endpoint de prerrequisitos.

### Parámetros

Los mismos utilizados anteriormente.

### Flujo

1. Localiza el curso.
2. Busca todas las dependencias.
3. Devuelve las asignaturas habilitadas.

### Respuesta

```text
CourseUnlocksResponse
```

Este endpoint facilita la planificación académica del estudiante.

---

# 11.16.9 Certificaciones

### Endpoint

```http
GET /api/v1/study/certifications
```

### Objetivo

Obtiene certificaciones profesionales recomendadas.

Puede consultarse una lista general o filtrarse por área.

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| area | String (Opcional) |

### Ejemplo

```http
GET /api/v1/study/certifications?area=Cloud
```

### Flujo

1. Recibe el área.
2. Consulta la información registrada.
3. Devuelve una lista de certificaciones.

### Respuesta

```text
list[CertificationResponse]
```

---

# 11.16.10 Ruta de Aprendizaje

### Endpoint

```http
GET /api/v1/study/learning-route/{user_id}
```

### Objetivo

Obtiene la ruta personalizada de aprendizaje para un estudiante.

Esta funcionalidad considera el avance académico registrado.

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| user_id | Integer |

### Flujo

1. Consulta los cursos del estudiante.
2. Evalúa el progreso.
3. Calcula la siguiente ruta recomendada.
4. Devuelve la planificación.

### Respuesta

```text
list[LearningRouteResponse]
```

---

# 11.16.11 Plataformas de Aprendizaje

### Endpoint

```http
GET /api/v1/study/learning-platforms
```

### Objetivo

Obtiene plataformas educativas recomendadas para complementar la formación académica.

Entre las áreas disponibles se encuentran:

- DevOps
- Backend
- Cloud
- Redes
- Inteligencia Artificial

### Parámetros

| Parámetro | Tipo |
|-----------|------|
| area | String (Opcional) |

### Flujo

1. Recibe el área.
2. Consulta las plataformas asociadas.
3. Organiza la información.
4. Devuelve el resultado.

### Respuesta

```text
list[LearningPlatformResponse]
```

---

# 11.17 Flujo General del Study Service

El funcionamiento general del microservicio puede resumirse en el siguiente proceso:

```text
Solicitud HTTP
        │
        ▼
FastAPI
        │
        ▼
study_route.py
        │
        ▼
StudyService
        │
        ▼
SQLAlchemy
        │
        ▼
Supabase PostgreSQL
        │
        ▼
Respuesta Pydantic
        │
        ▼
Frontend
```

El archivo `study_route.py` únicamente recibe la solicitud HTTP, valida los parámetros mediante FastAPI y delega toda la lógica de negocio a la clase `StudyService`.

Esta separación mantiene una arquitectura desacoplada donde las rutas contienen únicamente la lógica de presentación, mientras que el procesamiento de datos se concentra en la capa de servicios.

# 11.18 Courses Service

Courses Service administra la consulta de cursos, asignaturas matriculadas, horarios, secciones activas y sílabos.

La lógica de negocio principal se encuentra en:

```text
backend/services/courses-service/app/services/course_service.py
```

La clase principal es:

```python
class CourseService:
```

Esta clase recibe una sesión de SQLAlchemy y crea una instancia de `CourseRepository`.

```python
def __init__(self, db: Session):
    self.repository = CourseRepository(db)
```

La arquitectura aplicada sigue el flujo:

```text
Ruta HTTP
    ↓
CourseService
    ↓
CourseRepository
    ↓
SQLAlchemy
    ↓
Supabase PostgreSQL
```

`CourseService` no ejecuta consultas SQL directamente. Delega el acceso a la base de datos a `CourseRepository` y se encarga de coordinar las operaciones, validar resultados y generar errores HTTP cuando corresponde.

---

## 11.18.1 Consulta General de Cursos

El método:

```python
get_all_courses()
```

permite obtener la lista general de cursos.

Su definición es:

```python
def get_all_courses(
    self,
    career: str | None = None,
    cycle: int | None = None,
):
```

### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `career` | `str` | No | Carrera utilizada para filtrar los cursos |
| `cycle` | `int` | No | Ciclo académico utilizado como filtro |

Ambos parámetros son opcionales.

Cuando no se proporciona ningún filtro, el repositorio puede devolver todos los cursos registrados.

Cuando se proporciona una carrera, la consulta se limita a los cursos relacionados con dicha carrera.

Cuando se proporciona un ciclo, únicamente se devuelven las asignaturas correspondientes a ese nivel académico.

### Delegación al repositorio

```python
return self.repository.get_all_courses(
    career=career,
    cycle=cycle,
)
```

La lógica de filtrado real se encuentra dentro de:

```text
app/repositories/course_repository.py
```

### Flujo interno

1. La ruta recibe los parámetros.
2. Se crea una instancia de `CourseService`.
3. `CourseService` llama a `CourseRepository`.
4. El repositorio construye la consulta.
5. SQLAlchemy ejecuta la consulta en PostgreSQL.
6. El resultado es devuelto a la ruta.

El método no genera un error cuando la consulta no encuentra resultados. En ese escenario, el comportamiento depende del valor retornado por el repositorio, normalmente una lista vacía.

---

## 11.18.2 Consulta de Cursos del Estudiante

El método:

```python
get_student_courses()
```

obtiene los cursos asociados a un estudiante.

Su definición es:

```python
def get_student_courses(self, user_id: int):
```

### Parámetro

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `user_id` | `int` | Sí | Identificador del estudiante |

### Delegación

```python
return self.repository.get_student_courses(
    user_id=user_id
)
```

Este método consulta las relaciones académicas almacenadas para el usuario.

La implementación puede involucrar tablas como:

```text
users
student_courses
course_sections
courses
```

La relación principal se establece mediante los registros de `student_courses`, creados durante la inscripción automática o por algún proceso posterior de matrícula.

### Flujo interno

1. Se recibe el identificador del estudiante.
2. Se consulta su matrícula.
3. Se obtienen las secciones asociadas.
4. Se recuperan los datos de los cursos.
5. Se devuelve la lista al cliente.

En la implementación mostrada, `CourseService` no verifica directamente si el usuario existe. Esa validación, en caso de estar implementada, debe encontrarse en el repositorio o en la ruta.

---

## 11.18.3 Consulta Detallada de un Curso

El método:

```python
get_course_detail()
```

obtiene la información completa de un curso.

Su definición es:

```python
def get_course_detail(
    self,
    course_reference: str,
):
```

### Parámetro

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `course_reference` | `str` | Sí | Código o nombre utilizado para localizar el curso |

La referencia puede corresponder al código o al nombre del curso, debido a que se utiliza el método:

```python
get_course_by_code_or_name()
```

### Búsqueda inicial

```python
course = self.repository.get_course_by_code_or_name(
    course_reference
)
```

El repositorio intenta localizar una asignatura utilizando la referencia recibida.

### Curso no encontrado

Cuando la consulta no encuentra un curso, se genera una excepción HTTP:

```python
raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Curso no encontrado.",
)
```

La respuesta esperada es:

```text
404 Not Found
```

Cuerpo de respuesta:

```json
{
  "detail": "Curso no encontrado."
}
```

### Consulta de la sección activa

Después de localizar el curso, el servicio obtiene su sección activa:

```python
section = self.repository.get_active_section_by_course(
    course_id=course.id
)
```

La sección puede contener información como:

- Código de sección.
- Periodo académico.
- Estado.
- Aula.
- Cupos.
- Docente relacionado.

Los campos exactos dependen del modelo implementado.

### Consulta de horarios

```python
schedules = self.repository.get_course_schedules(
    course_id=course.id,
    section_id=section.id if section else None,
)
```

Cuando existe una sección activa, se utiliza su identificador para limitar la consulta.

Cuando no existe una sección activa, se envía:

```python
section_id=None
```

El repositorio debe decidir cómo procesar ese valor.

### Consulta del sílabo

```python
syllabus = self.repository.get_course_syllabus(
    course_id=course.id
)
```

El sílabo se consulta utilizando el identificador interno del curso.

### Resultado compuesto

El método devuelve un diccionario con cuatro elementos:

```python
return {
    "course": course,
    "section": section,
    "schedules": schedules,
    "syllabus": syllabus,
}
```

Su estructura conceptual es:

```json
{
  "course": {},
  "section": {},
  "schedules": [],
  "syllabus": {}
}
```

La respuesta exacta depende de los modelos SQLAlchemy y de los esquemas Pydantic declarados en la ruta.

### Flujo completo

```text
Referencia del curso
        ↓
Buscar por código o nombre
        ↓
¿Existe?
   ├── No → 404 Not Found
   └── Sí
        ↓
Buscar sección activa
        ↓
Buscar horarios
        ↓
Buscar sílabo
        ↓
Construir respuesta completa
```

---

## 11.18.4 Consulta del Horario de un Curso

El método:

```python
get_course_schedule()
```

obtiene únicamente los horarios de una asignatura.

Su definición es:

```python
def get_course_schedule(
    self,
    course_reference: str,
):
```

### Parámetro

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `course_reference` | `str` | Sí | Código o nombre del curso |

### Localización del curso

```python
course = self.repository.get_course_by_code_or_name(
    course_reference
)
```

### Validación

Si el curso no existe:

```python
raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Curso no encontrado.",
)
```

### Consulta de sección

```python
section = self.repository.get_active_section_by_course(
    course_id=course.id
)
```

### Consulta de horarios

```python
return self.repository.get_course_schedules(
    course_id=course.id,
    section_id=section.id if section else None,
)
```

Este método no devuelve el curso, la sección ni el sílabo. Su resultado se limita a los horarios asociados.

La respuesta normalmente corresponde a una lista porque un curso puede tener más de una sesión semanal.

Ejemplo conceptual:

```json
[
  {
    "day": "Lunes",
    "start_time": "18:30",
    "end_time": "20:00",
    "classroom": "A-301"
  },
  {
    "day": "Miércoles",
    "start_time": "18:30",
    "end_time": "20:00",
    "classroom": "A-301"
  }
]
```

Este ejemplo es únicamente estructural. Los nombres reales de los campos deben documentarse a partir del esquema y modelo correspondientes.

---

## 11.18.5 Consulta del Sílabo

El método:

```python
get_course_syllabus()
```

obtiene el sílabo correspondiente a un curso.

Su definición es:

```python
def get_course_syllabus(
    self,
    course_reference: str,
):
```

### Parámetro

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `course_reference` | `str` | Sí | Código o nombre del curso |

### Búsqueda del curso

```python
course = self.repository.get_course_by_code_or_name(
    course_reference
)
```

### Validación

Cuando el curso no existe, se devuelve:

```text
404 Not Found
```

Respuesta:

```json
{
  "detail": "Curso no encontrado."
}
```

### Consulta del sílabo

```python
return self.repository.get_course_syllabus(
    course_id=course.id
)
```

El servicio primero convierte la referencia pública del curso en su identificador interno. Después utiliza ese identificador para consultar el registro correspondiente.

El contenido del sílabo puede incluir información como:

- Sumilla.
- Competencias.
- Unidades académicas.
- Resultados de aprendizaje.
- Bibliografía.
- Enlace al documento.
- Estado de disponibilidad.

Los campos definitivos deben obtenerse del modelo y esquema reales.

---

## 11.18.6 Manejo de Errores

La clase utiliza:

```python
from fastapi import HTTPException, status
```

El error controlado actualmente visible es:

```text
404 Not Found
```

Este error se utiliza en tres operaciones:

- Consulta detallada.
- Consulta de horario.
- Consulta de sílabo.

El mensaje retornado es:

```text
Curso no encontrado.
```

Este manejo evita que el repositorio continúe ejecutando consultas con un curso inexistente.

No se observa dentro de esta clase un manejo explícito para:

- Estudiante inexistente.
- Lista vacía de cursos.
- Sección inexistente.
- Horario inexistente.
- Sílabo inexistente.
- Error de conexión con PostgreSQL.

Estos escenarios pueden ser gestionados por el repositorio, por la ruta o mediante los controladores generales de FastAPI.

---

## 11.18.7 Responsabilidades por Capa

### Ruta

La ruta debe encargarse de:

- Recibir parámetros HTTP.
- Validar tipos básicos.
- Crear la sesión de base de datos.
- Instanciar `CourseService`.
- Declarar el modelo de respuesta.
- Retornar el resultado.

### Servicio

`CourseService` se encarga de:

- Coordinar varias consultas.
- Validar la existencia del curso.
- Generar errores HTTP controlados.
- Construir respuestas compuestas.
- Mantener la lógica de negocio fuera de la ruta.

### Repositorio

`CourseRepository` se encarga de:

- Ejecutar consultas SQLAlchemy.
- Filtrar cursos.
- Consultar matrículas.
- Buscar cursos por código o nombre.
- Obtener secciones activas.
- Recuperar horarios.
- Recuperar sílabos.

---

## 11.18.8 Métodos Utilizados del Repositorio

La clase utiliza los siguientes métodos:

```text
get_all_courses
get_student_courses
get_course_by_code_or_name
get_active_section_by_course
get_course_schedules
get_course_syllabus
```

Resumen:

| Método | Responsabilidad |
|---|---|
| `get_all_courses` | Consulta cursos con filtros opcionales |
| `get_student_courses` | Obtiene cursos asociados a un estudiante |
| `get_course_by_code_or_name` | Localiza un curso por código o nombre |
| `get_active_section_by_course` | Obtiene la sección activa |
| `get_course_schedules` | Recupera horarios |
| `get_course_syllabus` | Recupera el sílabo |

---

## 11.18.9 Resultado de la Capa de Servicio

La implementación actual permite soportar las siguientes operaciones funcionales:

- Listar cursos.
- Filtrar cursos por carrera.
- Filtrar cursos por ciclo.
- Consultar cursos matriculados por estudiante.
- Consultar información completa de una asignatura.
- Consultar su sección activa.
- Consultar sus horarios.
- Consultar su sílabo.
- Detectar cursos inexistentes.

La clase mantiene una responsabilidad concreta y no contiene lógica relacionada con autenticación, pagos, docentes o chatbot.

# 11.19 Endpoints del Courses Service

El Courses Service expone operaciones para consultar cursos, asignaturas matriculadas, información detallada, horarios y sílabos.

El router principal utiliza el prefijo:

```python
router = APIRouter(
    prefix="/courses",
    tags=["Courses"],
)
```

Al registrarse mediante el prefijo global configurado en `API_V1_PREFIX`, las rutas quedan disponibles bajo:

```text
/api/v1/courses
```

La lógica HTTP se encuentra en:

```text
backend/services/courses-service/app/routes/course_route.py
```

La lógica de negocio se encuentra en:

```text
backend/services/courses-service/app/services/course_service.py
```

El flujo general es:

```text
Cliente
  ↓
course_route.py
  ↓
CourseService
  ↓
CourseRepository
  ↓
SQLAlchemy
  ↓
Supabase PostgreSQL
```

---

## 11.19.1 Estado del Courses Service

### Método y ruta

```http
GET /api/v1/courses/health
```

### Objetivo

Comprueba que el microservicio se encuentra activo y puede atender solicitudes HTTP.

### Autenticación

No se declara una dependencia de autenticación en la ruta.

### Parámetros

No recibe parámetros.

### Respuesta

```json
{
  "service": "courses-service",
  "status": "healthy"
}
```

### Código esperado

```text
200 OK
```

### Ejemplo con cURL

```bash
curl http://localhost:8003/api/v1/courses/health
```

El puerto debe ajustarse al valor configurado para el Courses Service.

---

## 11.19.2 Verificación de conexión con la base de datos

### Método y ruta

```http
GET /api/v1/courses/db-check
```

### Objetivo

Verifica la comunicación entre el microservicio y Supabase PostgreSQL.

### Operación interna

La ruta obtiene una sesión mediante:

```python
db: Session = Depends(get_db)
```

Luego ejecuta:

```sql
SELECT 1 AS ok;
```

La consulta no valida tablas ni registros de negocio. Solamente confirma que la conexión está disponible y que PostgreSQL puede responder.

### Respuesta exitosa

```json
{
  "database": "connected",
  "result": {
    "ok": 1
  }
}
```

### Código esperado

```text
200 OK
```

### Ejemplo con cURL

```bash
curl http://localhost:8003/api/v1/courses/db-check
```

---

## 11.19.3 Listado general de cursos

### Método y ruta

```http
GET /api/v1/courses/
```

### Objetivo

Obtiene los cursos registrados en el sistema.

La consulta admite filtros opcionales por carrera y ciclo académico.

### Modelo de respuesta

```python
list[CourseResponse]
```

La respuesta es una lista de objetos validados con el esquema:

```text
CourseResponse
```

### Parámetros de consulta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `career` | `string` | No | Nombre de la carrera |
| `cycle` | `integer` | No | Ciclo académico |

### Ejemplo sin filtros

```http
GET /api/v1/courses/
```

### Ejemplo filtrado por carrera

```http
GET /api/v1/courses/?career=Ingeniería%20de%20Sistemas
```

### Ejemplo filtrado por ciclo

```http
GET /api/v1/courses/?cycle=8
```

### Ejemplo con ambos filtros

```http
GET /api/v1/courses/?career=Ingeniería%20de%20Sistemas&cycle=8
```

### Flujo interno

1. FastAPI recibe los parámetros opcionales.
2. Se obtiene una sesión de base de datos.
3. Se crea una instancia de `CourseService`.
4. La ruta ejecuta:

```python
service.get_all_courses(
    career=career,
    cycle=cycle,
)
```

5. `CourseService` delega la consulta a `CourseRepository`.
6. El repositorio aplica los filtros disponibles.
7. La respuesta se valida con `CourseResponse`.
8. FastAPI devuelve la lista en formato JSON.

### Ejemplo con cURL

```bash
curl "http://localhost:8003/api/v1/courses/?career=Ingeniería%20de%20Sistemas&cycle=8"
```

### Resultado sin coincidencias

La clase de servicio no genera una excepción cuando no encuentra cursos. El resultado esperado dependerá del repositorio y normalmente será:

```json
[]
```

---

## 11.19.4 Cursos matriculados del estudiante

### Método y ruta

```http
GET /api/v1/courses/my-courses/{user_id}
```

### Objetivo

Obtiene los cursos asociados a un estudiante mediante su identificador.

### Modelo de respuesta

```python
list[StudentCourseResponse]
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `user_id` | `integer` | Sí | Identificador del estudiante |

### Ejemplo

```http
GET /api/v1/courses/my-courses/15
```

### Flujo interno

1. FastAPI extrae `user_id` de la URL.
2. Se crea una sesión SQLAlchemy.
3. Se instancia `CourseService`.
4. La ruta ejecuta:

```python
service.get_student_courses(
    user_id=user_id
)
```

5. El servicio llama a:

```python
self.repository.get_student_courses(
    user_id=user_id
)
```

6. El repositorio consulta los cursos relacionados con el estudiante.
7. La respuesta se valida como una lista de `StudentCourseResponse`.

### Relación funcional

Este endpoint permite implementar la pantalla de cursos matriculados del ciclo vigente.

Su información depende de las relaciones existentes entre el estudiante, sus matrículas, las secciones y los cursos registrados.

### Ejemplo con cURL

```bash
curl http://localhost:8003/api/v1/courses/my-courses/15
```

### Posible respuesta sin cursos

```json
[]
```

La clase `CourseService` no declara una excepción específica cuando el estudiante no tiene cursos asociados.

---

## 11.19.5 Detalle de un curso

### Método y ruta

```http
GET /api/v1/courses/detail/{course_reference}
```

### Objetivo

Obtiene información consolidada de un curso.

La respuesta integra:

- Información general del curso.
- Sección activa.
- Horarios.
- Sílabo.

### Modelo de respuesta

```python
CourseDetailResponse
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `course_reference` | `string` | Sí | Código o nombre utilizado para localizar el curso |

### Ejemplo mediante código

```http
GET /api/v1/courses/detail/IS0801
```

### Flujo interno

La ruta ejecuta:

```python
service.get_course_detail(
    course_reference=course_reference
)
```

El servicio realiza las siguientes operaciones:

1. Busca el curso por código o nombre:

```python
course = self.repository.get_course_by_code_or_name(
    course_reference
)
```

2. Verifica que el curso exista.
3. Consulta la sección activa:

```python
section = self.repository.get_active_section_by_course(
    course_id=course.id
)
```

4. Consulta los horarios:

```python
schedules = self.repository.get_course_schedules(
    course_id=course.id,
    section_id=section.id if section else None,
)
```

5. Consulta el sílabo:

```python
syllabus = self.repository.get_course_syllabus(
    course_id=course.id
)
```

6. Construye una respuesta compuesta:

```python
{
    "course": course,
    "section": section,
    "schedules": schedules,
    "syllabus": syllabus,
}
```

### Curso inexistente

Cuando el curso no es localizado, el servicio genera:

```text
404 Not Found
```

Respuesta:

```json
{
  "detail": "Curso no encontrado."
}
```

### Ejemplo con cURL

```bash
curl http://localhost:8003/api/v1/courses/detail/IS0801
```

---

## 11.19.6 Horario de un curso

### Método y ruta

```http
GET /api/v1/courses/schedule/{course_reference}
```

### Objetivo

Obtiene las sesiones u horarios asociados a un curso.

### Modelo de respuesta

```python
list[CourseScheduleResponse]
```

### Parámetro

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `course_reference` | `string` | Sí |

### Ejemplo

```http
GET /api/v1/courses/schedule/IS0801
```

### Flujo interno

1. Se busca el curso por código o nombre.
2. Si no existe, se genera un error `404`.
3. Se obtiene su sección activa.
4. Se consultan los horarios vinculados al curso y, cuando corresponde, a la sección activa.
5. Se devuelve una lista validada con `CourseScheduleResponse`.

### Curso inexistente

```json
{
  "detail": "Curso no encontrado."
}
```

### Código

```text
404 Not Found
```

### Ejemplo con cURL

```bash
curl http://localhost:8003/api/v1/courses/schedule/IS0801
```

---

## 11.19.7 Sílabo de un curso

### Método y ruta

```http
GET /api/v1/courses/syllabus/{course_reference}
```

### Objetivo

Obtiene el sílabo relacionado con una asignatura.

### Modelo de respuesta

```python
list[CourseSyllabusResponse]
```

La ruta declara una lista como respuesta, por lo que puede devolver uno o más registros relacionados con el curso.

### Parámetro

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `course_reference` | `string` | Sí |

### Ejemplo

```http
GET /api/v1/courses/syllabus/IS0801
```

### Flujo interno

1. El servicio busca el curso.
2. Verifica su existencia.
3. Obtiene su identificador interno.
4. Consulta el sílabo mediante:

```python
self.repository.get_course_syllabus(
    course_id=course.id
)
```

5. FastAPI valida el resultado con `CourseSyllabusResponse`.

### Curso no encontrado

```json
{
  "detail": "Curso no encontrado."
}
```

### Ejemplo con cURL

```bash
curl http://localhost:8003/api/v1/courses/syllabus/IS0801
```

---

## 11.19.8 Resumen de rutas del Courses Service

| Método | Ruta | Modelo de respuesta |
|---|---|---|
| `GET` | `/api/v1/courses/health` | Respuesta directa |
| `GET` | `/api/v1/courses/db-check` | Respuesta directa |
| `GET` | `/api/v1/courses/` | `list[CourseResponse]` |
| `GET` | `/api/v1/courses/my-courses/{user_id}` | `list[StudentCourseResponse]` |
| `GET` | `/api/v1/courses/detail/{course_reference}` | `CourseDetailResponse` |
| `GET` | `/api/v1/courses/schedule/{course_reference}` | `list[CourseScheduleResponse]` |
| `GET` | `/api/v1/courses/syllabus/{course_reference}` | `list[CourseSyllabusResponse]` |

---

# 11.20 Endpoints del Payments Service

El Payments Service administra la consulta de obligaciones económicas, pagos vencidos, historial de operaciones, resumen de cuenta y registro de pagos.

El router utiliza:

```python
router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)
```

Las rutas quedan agrupadas bajo:

```text
/api/v1/payments
```

La lógica HTTP se encuentra en:

```text
backend/services/payments-service/app/routes/payment_route.py
```

El flujo general es:

```text
Cliente
  ↓
payment_route.py
  ↓
PaymentService
  ↓
Repositorio de pagos
  ↓
SQLAlchemy
  ↓
Supabase PostgreSQL
```

---

## 11.20.1 Estado del Payments Service

### Método y ruta

```http
GET /api/v1/payments/health
```

### Objetivo

Verifica que el servicio de pagos se encuentre operativo.

### Respuesta

```json
{
  "service": "payments-service",
  "status": "healthy"
}
```

### Autenticación

La ruta no declara una dependencia explícita de autenticación.

### Código esperado

```text
200 OK
```

---

## 11.20.2 Verificación de base de datos

### Método y ruta

```http
GET /api/v1/payments/db-check
```

### Objetivo

Comprueba la conexión del Payments Service con PostgreSQL.

### Consulta ejecutada

```sql
SELECT 1 AS ok;
```

### Respuesta

```json
{
  "database": "connected",
  "result": {
    "ok": 1
  }
}
```

---

## 11.20.3 Pagos pendientes

### Método y ruta

```http
GET /api/v1/payments/pending/{user_id}
```

### Objetivo

Obtiene las obligaciones de pago pendientes de un estudiante.

### Modelo de respuesta

```python
list[PaymentResponse]
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `user_id` | `integer` | Sí |

### Parámetro de consulta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `academic_period_code` | `string` | No | Código del periodo académico |

### Ejemplo de periodo

```text
202601
```

### Ejemplo de solicitud

```http
GET /api/v1/payments/pending/15?academic_period_code=202601
```

### Flujo interno

1. FastAPI obtiene `user_id`.
2. Lee opcionalmente `academic_period_code`.
3. Crea una sesión de base de datos.
4. Instancia `PaymentService`.
5. Ejecuta:

```python
service.get_pending_payments(
    user_id=user_id,
    academic_period_code=academic_period_code,
)
```

6. La capa de servicio consulta los pagos pendientes.
7. El resultado se valida con `PaymentResponse`.

### Solicitud sin periodo

```http
GET /api/v1/payments/pending/15
```

Cuando no se envía `academic_period_code`, el comportamiento exacto depende de la lógica implementada en `PaymentService`.

---

## 11.20.4 Pagos vencidos

### Método y ruta

```http
GET /api/v1/payments/overdue/{user_id}
```

### Objetivo

Obtiene las obligaciones cuyo vencimiento ya ocurrió y que continúan pendientes.

### Modelo de respuesta

```python
list[PaymentResponse]
```

### Parámetros

| Parámetro | Ubicación | Tipo | Obligatorio |
|---|---|---|---:|
| `user_id` | Ruta | `integer` | Sí |
| `academic_period_code` | Consulta | `string` | No |

### Ejemplo

```http
GET /api/v1/payments/overdue/15?academic_period_code=202601
```

### Flujo interno

```python
service.get_overdue_payments(
    user_id=user_id,
    academic_period_code=academic_period_code,
)
```

El servicio debe diferenciar las obligaciones vencidas mediante su fecha límite y estado de pago.

### Respuesta sin deudas vencidas

La respuesta esperada normalmente será:

```json
[]
```

---

## 11.20.5 Historial de pagos

### Método y ruta

```http
GET /api/v1/payments/history/{user_id}
```

### Objetivo

Obtiene el historial de pagos registrados para un estudiante.

### Modelo de respuesta

```python
list[PaymentHistoryResponse]
```

### Parámetros

| Parámetro | Ubicación | Tipo | Obligatorio |
|---|---|---|---:|
| `user_id` | Ruta | `integer` | Sí |
| `academic_period_code` | Consulta | `string` | No |

### Ejemplo

```http
GET /api/v1/payments/history/15?academic_period_code=202601
```

### Flujo interno

1. Se identifica al estudiante.
2. Se aplica el periodo académico cuando fue enviado.
3. `PaymentService` consulta las operaciones registradas.
4. La respuesta se valida mediante `PaymentHistoryResponse`.
5. Se devuelve la lista al frontend.

### Uso en la aplicación

Este endpoint permite mostrar:

- Pagos realizados.
- Fecha de operación.
- Estado de la transacción.
- Método utilizado.
- Obligación relacionada.

Los campos exactos dependen del esquema `PaymentHistoryResponse`.

---

## 11.20.6 Resumen de cuenta

### Método y ruta

```http
GET /api/v1/payments/summary/{user_id}
```

### Objetivo

Obtiene una vista consolidada del estado económico del estudiante.

### Modelo de respuesta

```python
AccountSummaryResponse
```

### Parámetros

| Parámetro | Ubicación | Tipo | Obligatorio |
|---|---|---|---:|
| `user_id` | Ruta | `integer` | Sí |
| `academic_period_code` | Consulta | `string` | No |

### Ejemplo

```http
GET /api/v1/payments/summary/15?academic_period_code=202601
```

### Flujo interno

La ruta ejecuta:

```python
service.get_account_summary(
    user_id=user_id,
    academic_period_code=academic_period_code,
)
```

La capa de servicio consolida los datos económicos y devuelve un único objeto.

El resumen puede representar información agregada como montos pendientes, vencidos o pagados. Los campos reales son los definidos por `AccountSummaryResponse`.

### Diferencia frente a las demás rutas

Las rutas `pending`, `overdue` e `history` devuelven listas.

La ruta `summary` devuelve:

```text
un único objeto
```

---

## 11.20.7 Registrar el pago de una obligación

### Método y ruta

```http
POST /api/v1/payments/pay/{payment_id}
```

### Objetivo

Procesa el pago de una obligación identificada mediante `payment_id`.

### Modelo de solicitud

```python
PayPaymentRequest
```

### Modelo de respuesta

```python
PayPaymentResponse
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `payment_id` | `integer` | Sí |

### Cuerpo de solicitud

El cuerpo debe incluir:

```json
{
  "payment_method_code": "CODIGO_DEL_METODO"
}
```

El campo exacto utilizado por la ruta es:

```python
payload.payment_method_code
```

### Ejemplo

```http
POST /api/v1/payments/pay/25
Content-Type: application/json
```

```json
{
  "payment_method_code": "CARD"
}
```

### Flujo interno

1. FastAPI obtiene `payment_id`.
2. Valida el cuerpo mediante `PayPaymentRequest`.
3. Crea una sesión SQLAlchemy.
4. Instancia `PaymentService`.
5. Ejecuta:

```python
service.pay_payment(
    payment_id=payment_id,
    payment_method_code=payload.payment_method_code,
)
```

6. La capa de servicio procesa la operación.
7. El resultado se valida como `PayPaymentResponse`.
8. Se devuelve la confirmación al cliente.

### Ejemplo con cURL

```bash
curl -X POST "http://localhost:8004/api/v1/payments/pay/25" \
  -H "Content-Type: application/json" \
  -d "{\"payment_method_code\":\"CARD\"}"
```

En PowerShell puede utilizarse:

```powershell
$body = @{
    payment_method_code = "CARD"
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Uri "http://localhost:8004/api/v1/payments/pay/25" `
    -ContentType "application/json" `
    -Body $body
```

### Consideración funcional

Esta ruta modifica información persistida. Por ello, a diferencia de las consultas anteriores, utiliza el método HTTP:

```text
POST
```

---

## 11.20.8 Resumen de rutas del Payments Service

| Método | Ruta | Modelo de respuesta |
|---|---|---|
| `GET` | `/api/v1/payments/health` | Respuesta directa |
| `GET` | `/api/v1/payments/db-check` | Respuesta directa |
| `GET` | `/api/v1/payments/pending/{user_id}` | `list[PaymentResponse]` |
| `GET` | `/api/v1/payments/overdue/{user_id}` | `list[PaymentResponse]` |
| `GET` | `/api/v1/payments/history/{user_id}` | `list[PaymentHistoryResponse]` |
| `GET` | `/api/v1/payments/summary/{user_id}` | `AccountSummaryResponse` |
| `POST` | `/api/v1/payments/pay/{payment_id}` | `PayPaymentResponse` |

---

# 11.21 Endpoints del Questions Service

El Questions Service implementa las operaciones relacionadas con el chatbot académico.

Sus responsabilidades públicas son:

- Recibir preguntas del estudiante.
- Generar respuestas.
- Crear o continuar sesiones.
- Persistir conversaciones cuando se solicita.
- Consultar sesiones anteriores.
- Recuperar mensajes de una sesión.

El router utiliza:

```python
router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)
```

Las rutas quedan disponibles bajo:

```text
/api/v1/questions
```

La lógica HTTP se encuentra en:

```text
backend/services/questions-service/app/routes/question_route.py
```

El flujo general es:

```text
Aplicación móvil
      ↓
question_route.py
      ↓
QuestionService
      ↓
Procesamiento de consulta
      ↓
Modelo de IA y/o base de datos
      ↓
Respuesta del chatbot
```

---

## 11.21.1 Estado del Questions Service

### Método y ruta

```http
GET /api/v1/questions/health
```

### Objetivo

Comprueba que el microservicio del chatbot se encuentra activo.

### Respuesta

```json
{
  "service": "questions-service",
  "status": "healthy"
}
```

### Código esperado

```text
200 OK
```

---

## 11.21.2 Verificación de conexión con PostgreSQL

### Método y ruta

```http
GET /api/v1/questions/db-check
```

### Objetivo

Valida que el Questions Service pueda conectarse a la base de datos.

### Consulta

```sql
SELECT 1 AS ok;
```

### Respuesta

```json
{
  "database": "connected",
  "result": {
    "ok": 1
  }
}
```

---

## 11.21.3 Enviar una pregunta al chatbot

### Método y ruta

```http
POST /api/v1/questions/ask
```

### Objetivo

Envía una pregunta académica al servicio de chatbot y obtiene una respuesta procesada.

### Modelo de solicitud

```python
AskQuestionRequest
```

### Modelo de respuesta

```python
AskQuestionResponse
```

### Ejecución asíncrona

La ruta está declarada mediante:

```python
async def ask_question(...)
```

También espera el servicio mediante:

```python
return await service.ask_question(...)
```

Esto permite que el procesamiento pueda realizar operaciones de entrada y salida sin bloquear completamente el servidor, especialmente al comunicarse con un proveedor externo de inteligencia artificial.

### Campos utilizados del cuerpo

La ruta extrae los siguientes valores:

```python
payload.user_id
payload.question
payload.session_id
payload.persist
```

Por tanto, la estructura conceptual de la solicitud es:

```json
{
  "user_id": 15,
  "question": "¿Qué cursos debo aprobar antes de llevar Inteligencia Artificial?",
  "session_id": null,
  "persist": true
}
```

La obligatoriedad, longitudes y valores predeterminados exactos dependen de `AskQuestionRequest`.

### Significado de los campos

| Campo | Función |
|---|---|
| `user_id` | Identifica al estudiante que realiza la consulta |
| `question` | Contiene el texto enviado al chatbot |
| `session_id` | Permite continuar una conversación existente |
| `persist` | Indica si la conversación debe almacenarse |

### Flujo interno

1. El frontend construye el cuerpo JSON.
2. FastAPI valida la solicitud con `AskQuestionRequest`.
3. Se crea una sesión SQLAlchemy.
4. Se instancia `QuestionService`.
5. La ruta ejecuta:

```python
await service.ask_question(
    user_id=payload.user_id,
    question=payload.question,
    session_id=payload.session_id,
    persist=payload.persist,
)
```

6. El servicio procesa la pregunta.
7. Cuando corresponde, recupera contexto de una sesión existente.
8. Genera la respuesta.
9. Si `persist` está habilitado, almacena la conversación.
10. Devuelve un objeto `AskQuestionResponse`.

### Nueva conversación

Para iniciar una conversación nueva puede enviarse:

```json
{
  "user_id": 15,
  "question": "Explícame los prerrequisitos de Cloud Computing.",
  "session_id": null,
  "persist": true
}
```

### Continuación de sesión

```json
{
  "user_id": 15,
  "question": "¿Y qué certificación me recomiendas después?",
  "session_id": 8,
  "persist": true
}
```

### Consulta no persistente

```json
{
  "user_id": 15,
  "question": "¿Qué significa DevOps?",
  "session_id": null,
  "persist": false
}
```

### Ejemplo con cURL

```bash
curl -X POST "http://localhost:8005/api/v1/questions/ask" \
  -H "Content-Type: application/json" \
  -d "{
    \"user_id\": 15,
    \"question\": \"¿Qué cursos debo llevar para especializarme en DevOps?\",
    \"session_id\": null,
    \"persist\": true
  }"
```

---

## 11.21.4 Consultar sesiones de un usuario

### Método y ruta

```http
GET /api/v1/questions/sessions/{user_id}
```

### Objetivo

Obtiene las sesiones de conversación relacionadas con un estudiante.

### Modelo de respuesta

```python
list[ChatSessionResponse]
```

### Parámetro

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `user_id` | `integer` | Sí |

### Ejemplo

```http
GET /api/v1/questions/sessions/15
```

### Flujo interno

1. Se recibe el identificador del usuario.
2. Se crea una sesión de base de datos.
3. Se instancia `QuestionService`.
4. Se ejecuta:

```python
service.get_user_sessions(
    user_id=user_id
)
```

5. El servicio consulta las sesiones relacionadas.
6. FastAPI valida la lista con `ChatSessionResponse`.
7. La información se devuelve al frontend.

### Uso funcional

Este endpoint permite construir la pantalla de historial de conversaciones.

Cada sesión puede representar un diálogo independiente entre el estudiante y el chatbot.

### Usuario sin sesiones

La respuesta esperada normalmente será:

```json
[]
```

---

## 11.21.5 Consultar mensajes de una sesión

### Método y ruta

```http
GET /api/v1/questions/sessions/{session_id}/messages
```

### Objetivo

Recupera los mensajes pertenecientes a una sesión específica.

### Modelo de respuesta

```python
list[ChatMessageResponse]
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `session_id` | `integer` | Sí |

### Parámetro de consulta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `user_id` | `integer` | No | Identificador del propietario de la sesión |

### Ejemplo básico

```http
GET /api/v1/questions/sessions/8/messages
```

### Ejemplo indicando propietario

```http
GET /api/v1/questions/sessions/8/messages?user_id=15
```

### Flujo interno

La ruta ejecuta:

```python
service.get_session_messages(
    session_id=session_id,
    user_id=user_id,
)
```

El parámetro opcional `user_id` puede utilizarse para restringir la consulta al propietario de la sesión.

### Uso funcional

Este endpoint permite reconstruir una conversación completa en la aplicación móvil.

La respuesta puede incluir mensajes del usuario y respuestas del asistente. Los campos exactos dependen de `ChatMessageResponse`.

### Sesión sin mensajes

La respuesta normalmente será:

```json
[]
```

El manejo de una sesión inexistente depende de `QuestionService`.

---

## 11.21.6 Resumen de rutas del Questions Service

| Método | Ruta | Modelo de respuesta |
|---|---|---|
| `GET` | `/api/v1/questions/health` | Respuesta directa |
| `GET` | `/api/v1/questions/db-check` | Respuesta directa |
| `POST` | `/api/v1/questions/ask` | `AskQuestionResponse` |
| `GET` | `/api/v1/questions/sessions/{user_id}` | `list[ChatSessionResponse]` |
| `GET` | `/api/v1/questions/sessions/{session_id}/messages` | `list[ChatMessageResponse]` |

---

# 11.22 Endpoints del Teachers Service

El Teachers Service administra la consulta de docentes y su relación con los cursos del estudiante.

El router utiliza:

```python
router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"],
)
```

Las rutas quedan disponibles bajo:

```text
/api/v1/teachers
```

La lógica HTTP se encuentra en:

```text
backend/services/teachers-service/app/routes/teacher_route.py
```

El flujo general es:

```text
Cliente
  ↓
teacher_route.py
  ↓
TeacherService
  ↓
Repositorio
  ↓
SQLAlchemy
  ↓
Supabase PostgreSQL
```

---

## 11.22.1 Estado del Teachers Service

### Método y ruta

```http
GET /api/v1/teachers/health
```

### Objetivo

Comprueba que el servicio de docentes se encuentra disponible.

### Respuesta

```json
{
  "service": "teachers-service",
  "status": "healthy"
}
```

### Código esperado

```text
200 OK
```

---

## 11.22.2 Verificación de conexión con la base de datos

### Método y ruta

```http
GET /api/v1/teachers/db-check
```

### Objetivo

Valida la conexión del Teachers Service con PostgreSQL.

### Consulta ejecutada

```sql
SELECT 1 AS ok;
```

### Respuesta

```json
{
  "database": "connected",
  "result": {
    "ok": 1
  }
}
```

---

## 11.22.3 Listado general de docentes

### Método y ruta

```http
GET /api/v1/teachers/
```

### Objetivo

Obtiene todos los docentes registrados en el sistema.

### Modelo de respuesta

```python
list[TeacherResponse]
```

### Parámetros

No recibe parámetros funcionales.

La sesión de base de datos se inyecta mediante:

```python
db: Session = Depends(get_db)
```

### Flujo interno

1. La ruta recibe la solicitud.
2. Se obtiene una sesión SQLAlchemy.
3. Se instancia `TeacherService`.
4. Se ejecuta:

```python
service.get_all_teachers()
```

5. La capa de servicio consulta los docentes.
6. El resultado se valida mediante `TeacherResponse`.
7. Se devuelve la lista al cliente.

### Ejemplo

```http
GET /api/v1/teachers/
```

### Ejemplo con cURL

```bash
curl http://localhost:8006/api/v1/teachers/
```

### Resultado sin registros

```json
[]
```

El manejo definitivo depende de la implementación de `TeacherService`.

---

## 11.22.4 Docentes de los cursos del estudiante

### Método y ruta

```http
GET /api/v1/teachers/my-teachers/{user_id}
```

### Objetivo

Obtiene los docentes relacionados con los cursos matriculados por un estudiante.

### Modelo de respuesta

```python
list[TeacherCourseResponse]
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `user_id` | `integer` | Sí |

### Parámetro de consulta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `academic_period` | `string` | No | Periodo académico |

### Ejemplo de periodo

```text
202601
```

### Ejemplo de solicitud

```http
GET /api/v1/teachers/my-teachers/15?academic_period=202601
```

### Flujo interno

1. FastAPI extrae el identificador del usuario.
2. Lee opcionalmente el periodo académico.
3. Crea una sesión de base de datos.
4. Instancia `TeacherService`.
5. Ejecuta:

```python
service.get_teachers_by_user_courses(
    user_id=user_id,
    academic_period=academic_period,
)
```

6. La capa de servicio consulta los cursos del estudiante.
7. Relaciona dichos cursos con sus docentes.
8. Devuelve una lista de `TeacherCourseResponse`.

### Solicitud sin periodo

```http
GET /api/v1/teachers/my-teachers/15
```

Cuando no se envía el periodo, el criterio temporal utilizado depende de la lógica de `TeacherService`.

### Uso funcional

Este endpoint alimenta el módulo Docentes de la aplicación, mostrando solamente a los profesores relacionados con las asignaturas del estudiante.

---

## 11.22.5 Detalle de un docente

### Método y ruta

```http
GET /api/v1/teachers/detail/{teacher_reference}
```

### Objetivo

Obtiene la información detallada de un docente.

### Modelo de respuesta

```python
TeacherDetailResponse
```

### Parámetro de ruta

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `teacher_reference` | `string` | Sí | Referencia utilizada para localizar al docente |

El criterio exacto de búsqueda puede corresponder a un código, nombre u otra referencia definida en `TeacherService`.

### Parámetro de consulta

| Parámetro | Tipo | Obligatorio |
|---|---|---:|
| `academic_period` | `string` | No |

### Ejemplo

```http
GET /api/v1/teachers/detail/DOC001?academic_period=202601
```

### Flujo interno

La ruta ejecuta:

```python
service.get_teacher_detail(
    teacher_reference=teacher_reference,
    academic_period=academic_period,
)
```

El servicio debe localizar al docente y construir la respuesta detallada.

El periodo académico permite limitar o contextualizar la información relacionada con sus cursos.

### Ejemplo con cURL

```bash
curl "http://localhost:8006/api/v1/teachers/detail/DOC001?academic_period=202601"
```

### Docente inexistente

El código de la ruta no contiene directamente una validación. El comportamiento depende de la implementación de `TeacherService`.

Si el servicio genera una excepción `HTTPException`, FastAPI devolverá el código y detalle definidos en dicha capa.

---

## 11.22.6 Resumen de rutas del Teachers Service

| Método | Ruta | Modelo de respuesta |
|---|---|---|
| `GET` | `/api/v1/teachers/health` | Respuesta directa |
| `GET` | `/api/v1/teachers/db-check` | Respuesta directa |
| `GET` | `/api/v1/teachers/` | `list[TeacherResponse]` |
| `GET` | `/api/v1/teachers/my-teachers/{user_id}` | `list[TeacherCourseResponse]` |
| `GET` | `/api/v1/teachers/detail/{teacher_reference}` | `TeacherDetailResponse` |

---

# 11.23 Resumen general de endpoints documentados

Los microservicios implementados exponen rutas agrupadas por dominio.

## Auth Service

```text
GET  /health
POST /api/v1/users/register
POST /api/v1/users/login
GET  /api/v1/users/me
```

## Study Service

```text
GET /api/v1/study/health
GET /api/v1/study/db-check
GET /api/v1/study/curriculum
GET /api/v1/study/curriculum/full
GET /api/v1/study/specialization-path
GET /api/v1/study/next-cycle/{user_id}
GET /api/v1/study/course-prerequisites/{course_reference}
GET /api/v1/study/course-unlocks/{course_reference}
GET /api/v1/study/certifications
GET /api/v1/study/learning-route/{user_id}
GET /api/v1/study/learning-platforms
```

## Courses Service

```text
GET /api/v1/courses/health
GET /api/v1/courses/db-check
GET /api/v1/courses/
GET /api/v1/courses/my-courses/{user_id}
GET /api/v1/courses/detail/{course_reference}
GET /api/v1/courses/schedule/{course_reference}
GET /api/v1/courses/syllabus/{course_reference}
```

## Payments Service

```text
GET  /api/v1/payments/health
GET  /api/v1/payments/db-check
GET  /api/v1/payments/pending/{user_id}
GET  /api/v1/payments/overdue/{user_id}
GET  /api/v1/payments/history/{user_id}
GET  /api/v1/payments/summary/{user_id}
POST /api/v1/payments/pay/{payment_id}
```

## Questions Service

```text
GET  /api/v1/questions/health
GET  /api/v1/questions/db-check
POST /api/v1/questions/ask
GET  /api/v1/questions/sessions/{user_id}
GET  /api/v1/questions/sessions/{session_id}/messages
```

## Teachers Service

```text
GET /api/v1/teachers/health
GET /api/v1/teachers/db-check
GET /api/v1/teachers/
GET /api/v1/teachers/my-teachers/{user_id}
GET /api/v1/teachers/detail/{teacher_reference}
```

---

# 11.24 Clasificación de operaciones HTTP

La API utiliza principalmente los métodos `GET` y `POST`.

## Operaciones GET

Se utilizan para consultar información sin solicitar una modificación explícita del recurso.

Ejemplos:

```text
GET /api/v1/study/curriculum
GET /api/v1/courses/my-courses/{user_id}
GET /api/v1/payments/history/{user_id}
GET /api/v1/questions/sessions/{user_id}
GET /api/v1/teachers/my-teachers/{user_id}
```

## Operaciones POST

Se utilizan cuando el cliente envía datos para ejecutar una operación.

Ejemplos:

```text
POST /api/v1/users/register
POST /api/v1/users/login
POST /api/v1/questions/ask
POST /api/v1/payments/pay/{payment_id}
```

La consulta al chatbot utiliza `POST` porque recibe un cuerpo estructurado y genera una nueva interacción.

El registro de pago utiliza `POST` porque modifica el estado persistente de una obligación económica.

---

# 11.25 Inyección de la sesión de base de datos

Los endpoints que consultan PostgreSQL reciben una sesión mediante:

```python
db: Session = Depends(get_db)
```

`Depends` permite que FastAPI ejecute la dependencia antes de llamar a la función principal.

El flujo es:

```text
Solicitud HTTP
      ↓
FastAPI ejecuta get_db
      ↓
Se crea una sesión SQLAlchemy
      ↓
La sesión se entrega a la ruta
      ↓
La ruta instancia el servicio
      ↓
El servicio utiliza el repositorio
      ↓
Finaliza la solicitud
      ↓
La sesión se libera
```

Este patrón evita crear manualmente una conexión dentro de cada endpoint.

---

# 11.26 Validación mediante esquemas Pydantic

Los modelos de respuesta declarados mediante `response_model` cumplen varias funciones:

- Validan la estructura devuelta.
- Transforman los objetos a JSON.
- Documentan automáticamente Swagger.
- Restringen los campos expuestos.
- Detectan incompatibilidades entre el servicio y la API.

Ejemplo:

```python
@router.get(
    "/pending/{user_id}",
    response_model=list[PaymentResponse],
)
```

La ruta debe devolver una lista compatible con `PaymentResponse`.

En el chatbot:

```python
@router.post(
    "/ask",
    response_model=AskQuestionResponse,
)
```

La respuesta de `QuestionService.ask_question` debe coincidir con el esquema declarado.

---

# 11.27 Parámetros de ruta, consulta y cuerpo

La API utiliza tres formas principales de entrada.

## Parámetros de ruta

Forman parte de la dirección.

```text
/api/v1/courses/detail/{course_reference}
```

Ejemplo:

```text
/api/v1/courses/detail/IS0801
```

## Parámetros de consulta

Se agregan después del símbolo `?`.

```text
/api/v1/payments/pending/15?academic_period_code=202601
```

Permiten aplicar filtros sin cambiar la identidad principal del recurso.

## Cuerpo JSON

Se utiliza en solicitudes `POST`.

Ejemplo del chatbot:

```json
{
  "user_id": 15,
  "question": "¿Qué cursos debo llevar?",
  "session_id": null,
  "persist": true
}
```

---

# 11.28 Endpoints de diagnóstico

Cada microservicio de dominio implementa dos operaciones técnicas.

## Health check

```text
/health
```

Comprueba que la aplicación FastAPI se encuentra ejecutándose.

## Database check

```text
/db-check
```

Comprueba que la aplicación puede comunicarse con PostgreSQL.

La diferencia es importante:

```text
Health correcto + db-check incorrecto
```

significa que FastAPI está activo, pero existe un problema de conexión con la base de datos.

```text
Health incorrecto
```

significa que el servicio no está disponible, no inició correctamente o no puede alcanzarse mediante el puerto o gateway configurado.

---

# 11.29 Pruebas mediante Swagger

Cada microservicio FastAPI genera una interfaz Swagger en:

```text
/docs
```

Ejemplo directo del Study Service:

```text
http://localhost:8002/docs
```

Desde Swagger se puede:

1. Seleccionar un endpoint.
2. Presionar `Try it out`.
3. Completar parámetros.
4. Ingresar el cuerpo JSON cuando corresponda.
5. Ejecutar la solicitud.
6. Revisar el código HTTP.
7. Revisar la respuesta.
8. Copiar el comando cURL generado.

Los endpoints deben probarse utilizando el puerto asignado a cada microservicio o mediante la dirección central de Nginx.

---

# 11.30 Pruebas mediante Nginx

En el despliegue integrado, Nginx funciona como punto de entrada.

El cliente no necesita conocer directamente el puerto interno de cada contenedor.

Flujo:

```text
Aplicación móvil
      ↓
Nginx
      ↓
Ruta solicitada
      ↓
Microservicio correspondiente
```

Ejemplos:

```text
/api/v1/users/login
```

se dirige al Auth Service.

```text
/api/v1/study/curriculum
```

se dirige al Study Service.

```text
/api/v1/courses/my-courses/15
```

se dirige al Courses Service.

```text
/api/v1/payments/summary/15
```

se dirige al Payments Service.

```text
/api/v1/questions/ask
```

se dirige al Questions Service.

```text
/api/v1/teachers/my-teachers/15
```

se dirige al Teachers Service.

---

# 11.31 Consideraciones actuales de seguridad

Las rutas mostradas de Study, Courses, Payments, Questions y Teachers no declaran directamente una dependencia similar a:

```python
Depends(get_current_user)
```

Por tanto, según el código proporcionado, la autorización JWT no se aplica de manera explícita dentro de esos routers.

El Auth Service sí implementa autenticación mediante JWT para operaciones como:

```text
GET /api/v1/users/me
```

En un entorno productivo, los endpoints que reciben identificadores como:

```text
user_id
payment_id
session_id
```

deben impedir que un usuario consulte o modifique información de otro estudiante.

Esta validación puede implementarse:

- Dentro de cada microservicio.
- Mediante dependencias compartidas.
- En una capa de gateway.
- Mediante validación del token y propiedad del recurso.

La documentación técnica debe diferenciar el estado implementado de una recomendación futura. Actualmente, los routers entregados no muestran dicha dependencia de autorización.

---

# 11.32 Códigos HTTP principales

## 200 OK

Indica que una consulta o procesamiento finalizó correctamente.

Ejemplos:

```text
GET /api/v1/courses/
GET /api/v1/payments/summary/15
GET /api/v1/teachers/
```

## 404 Not Found

Courses Service lo utiliza cuando no encuentra una asignatura:

```json
{
  "detail": "Curso no encontrado."
}
```

## 422 Unprocessable Entity

FastAPI lo genera automáticamente cuando los parámetros o el cuerpo no cumplen el esquema esperado.

Ejemplos:

- Enviar texto donde se espera un entero.
- Omitir un campo obligatorio.
- Enviar un cuerpo incompatible con `AskQuestionRequest`.
- Enviar un cuerpo incompatible con `PayPaymentRequest`.

## 500 Internal Server Error

Puede producirse ante errores no controlados, como:

- Fallo de PostgreSQL.
- Error del proveedor de inteligencia artificial.
- Excepción no capturada.
- Incompatibilidad entre el resultado y el `response_model`.

---

# 11.33 Flujo completo de una consulta desde el frontend

Una operación típica sigue este proceso:

```text
Usuario selecciona una función
        ↓
React Native construye la solicitud
        ↓
Se utiliza la URL configurada
        ↓
Nginx o el puerto local recibe la solicitud
        ↓
FastAPI identifica el router
        ↓
Se validan parámetros y cuerpo
        ↓
Se ejecuta la dependencia get_db
        ↓
La ruta instancia la clase de servicio
        ↓
El servicio ejecuta la lógica de negocio
        ↓
El repositorio consulta PostgreSQL
        ↓
Pydantic valida la respuesta
        ↓
FastAPI devuelve JSON
        ↓
React Native actualiza la interfaz
```

---

# 11.34 Flujo funcional por módulo

## Módulo Estudio

```text
Frontend
  ↓
GET /api/v1/study/curriculum
  ↓
StudyService
  ↓
Consulta del plan curricular
  ↓
Visualización por ciclos
```

## Módulo Cursos

```text
Frontend
  ↓
GET /api/v1/courses/my-courses/{user_id}
  ↓
CourseService
  ↓
Consulta de matrículas
  ↓
Lista de cursos del estudiante
```

## Módulo Pagos

```text
Frontend
  ↓
GET /api/v1/payments/summary/{user_id}
  ↓
PaymentService
  ↓
Consolidación de obligaciones
  ↓
Resumen económico
```

## Módulo Preguntas

```text
Frontend
  ↓
POST /api/v1/questions/ask
  ↓
QuestionService
  ↓
Procesamiento de la consulta
  ↓
Respuesta del chatbot
```

## Módulo Docentes

```text
Frontend
  ↓
GET /api/v1/teachers/my-teachers/{user_id}
  ↓
TeacherService
  ↓
Relación cursos-docentes
  ↓
Lista personalizada
```

---

# 11.35 Cierre del capítulo

La API de Academic Chatbot Platform se encuentra dividida en microservicios especializados.

Cada dominio mantiene sus propias rutas y clases de servicio:

```text
Auth Service
Study Service
Courses Service
Payments Service
Questions Service
Teachers Service
```

Los routers reciben las solicitudes HTTP, validan sus entradas y delegan la lógica a las clases de servicio.

Las clases de servicio coordinan las operaciones de negocio y utilizan repositorios o sesiones SQLAlchemy para acceder a Supabase PostgreSQL.

FastAPI proporciona:

- Enrutamiento.
- Validación.
- Inyección de dependencias.
- Serialización JSON.
- Documentación Swagger.
- Gestión de errores HTTP.

La separación por microservicios permite desarrollar, probar, desplegar y mantener cada módulo de forma independiente, mientras Nginx proporciona un punto de acceso central para el frontend móvil.

Con la documentación de Auth, Study, Courses, Payments, Questions y Teachers queda completado el inventario de endpoints actualmente proporcionado para la plataforma.


# 12.11 Flujo de Persistencia de Datos

La persistencia de información se realiza mediante PostgreSQL administrado en Supabase.

Los microservicios acceden a la base de datos a través de SQLAlchemy. Cada servicio obtiene una sesión mediante la dependencia:

```python
db: Session = Depends(get_db)
```

La sesión es entregada a la capa de servicio y posteriormente al repositorio correspondiente.

El flujo general de persistencia es:

```text
Solicitud HTTP
    ↓
Router FastAPI
    ↓
Dependencia get_db
    ↓
Sesión SQLAlchemy
    ↓
Servicio
    ↓
Repositorio
    ↓
Supabase PostgreSQL
    ↓
Resultado
    ↓
Respuesta JSON
```

La capa de rutas no ejecuta consultas SQL de negocio directamente, salvo en los endpoints técnicos de verificación de base de datos.

Por ejemplo, los endpoints `db-check` ejecutan:

```sql
SELECT 1 AS ok;
```

Esta consulta tiene únicamente un propósito de diagnóstico.

Las operaciones de negocio utilizan repositorios o servicios especializados.

---

## 12.11.1 Persistencia de Usuarios

El registro de usuarios se realiza desde Auth Service.

El proceso general es:

```text
Formulario de registro
    ↓
POST /api/v1/users/register
    ↓
Validación de datos
    ↓
Verificación de correo
    ↓
Hash de contraseña
    ↓
Creación del usuario
    ↓
Inscripción académica automática
    ↓
Confirmación
```

Los datos del usuario se almacenan en la tabla:

```text
users
```

La contraseña no debe almacenarse en texto plano.

El backend conserva una versión cifrada o resumida mediante un algoritmo de hash.

Después del registro, Auth Service ejecuta la lógica de inscripción automática definida en la implementación actual.

Esta operación relaciona al nuevo estudiante con los cursos correspondientes según su carrera, ciclo o configuración académica.

---

## 12.11.2 Persistencia de Cursos del Estudiante

La asociación entre estudiantes y cursos se representa mediante registros de matrícula.

El flujo funcional es:

```text
Usuario registrado
    ↓
Determinación de carrera y ciclo
    ↓
Consulta de cursos correspondientes
    ↓
Creación de relaciones académicas
    ↓
Persistencia en student_courses
```

Posteriormente, Courses Service consulta estas relaciones mediante:

```python
get_student_courses(user_id=user_id)
```

El frontend utiliza el resultado para mostrar los cursos matriculados.

La plataforma no necesita copiar toda la información del curso dentro del registro del estudiante.

En su lugar, conserva relaciones mediante identificadores.

Esto reduce duplicidad y mantiene consistencia.

---

## 12.11.3 Persistencia de Conversaciones

Questions Service permite conservar las conversaciones del chatbot.

La solicitud incluye el campo:

```text
persist
```

Cuando su valor es:

```json
true
```

la interacción puede almacenarse.

El flujo es:

```text
Pregunta del usuario
    ↓
Procesamiento del chatbot
    ↓
Generación de respuesta
    ↓
¿persist = true?
    ├── No → devolver respuesta
    └── Sí
         ↓
    Crear o reutilizar sesión
         ↓
    Guardar mensaje del usuario
         ↓
    Guardar respuesta del asistente
         ↓
    Confirmar persistencia
```

Las conversaciones se organizan en sesiones.

Una sesión puede contener múltiples mensajes.

El historial se recupera mediante:

```text
GET /api/v1/questions/sessions/{user_id}
```

Los mensajes de una sesión se recuperan mediante:

```text
GET /api/v1/questions/sessions/{session_id}/messages
```

---

## 12.11.4 Persistencia de Pagos

Payments Service administra obligaciones económicas y operaciones de pago.

La consulta de obligaciones utiliza operaciones de lectura:

```text
GET /pending/{user_id}
GET /overdue/{user_id}
GET /history/{user_id}
GET /summary/{user_id}
```

La operación que modifica el estado persistente es:

```text
POST /pay/{payment_id}
```

El flujo general del pago es:

```text
Usuario selecciona obligación
    ↓
Selecciona método de pago
    ↓
POST /payments/pay/{payment_id}
    ↓
Validación de la obligación
    ↓
Registro del método
    ↓
Actualización del estado
    ↓
Confirmación
```

La ruta recibe:

```json
{
  "payment_method_code": "CARD"
}
```

La lógica definitiva de actualización se encuentra en `PaymentService`.

---

# 12.12 Comunicación entre Frontend y Backend

El frontend utiliza solicitudes HTTP para comunicarse con la API.

La aplicación móvil no accede directamente a PostgreSQL.

Tampoco ejecuta lógica de negocio crítica.

Su responsabilidad es:

- Capturar datos.
- Validar información básica.
- Enviar solicitudes.
- Procesar respuestas.
- Mostrar estados de carga.
- Mostrar errores.
- Actualizar la interfaz.

El backend se encarga de:

- Validar datos.
- Autenticar usuarios.
- Consultar la base de datos.
- Ejecutar reglas de negocio.
- Generar respuestas.
- Proteger información sensible.

---

## 12.12.1 Construcción de la URL

El frontend utiliza una URL base configurada según el entorno.

En desarrollo local puede utilizar una dirección LAN:

```text
http://192.168.x.x:PUERTO
```

En producción utiliza la dirección pública del servidor o dominio asociado.

La estructura general es:

```text
API_BASE_URL + endpoint
```

Ejemplo:

```text
http://192.168.18.16:8000/api/v1/users/login
```

Cuando se utiliza Nginx, el frontend puede consumir una única dirección base:

```text
http://SERVIDOR/api/v1
```

---

## 12.12.2 Solicitudes GET

Las operaciones de consulta utilizan `GET`.

Ejemplo conceptual:

```typescript
const response = await fetch(
  `${API_BASE_URL}/api/v1/courses/my-courses/${userId}`
);
```

El frontend debe comprobar:

```typescript
response.ok
```

antes de procesar el contenido.

Después convierte la respuesta a JSON:

```typescript
const data = await response.json();
```

---

## 12.12.3 Solicitudes POST

Las operaciones que envían información utilizan `POST`.

Ejemplo conceptual para el chatbot:

```typescript
const response = await fetch(
  `${API_BASE_URL}/api/v1/questions/ask`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      question,
      session_id: sessionId,
      persist: true,
    }),
  }
);
```

El encabezado:

```text
Content-Type: application/json
```

indica que el cuerpo se envía como JSON.

---

## 12.12.4 Inicio de Sesión

El endpoint de login utiliza:

```text
application/x-www-form-urlencoded
```

porque recibe `OAuth2PasswordRequestForm`.

Por ello, el frontend no debe enviar el login como JSON si el backend conserva esta implementación.

El cuerpo se construye mediante parámetros codificados.

Ejemplo conceptual:

```typescript
const body = new URLSearchParams();

body.append("username", email);
body.append("password", password);
```

La solicitud se envía con:

```typescript
headers: {
  "Content-Type": "application/x-www-form-urlencoded",
}
```

---

## 12.12.5 Respuestas del Backend

El backend devuelve respuestas JSON.

Ejemplo exitoso:

```json
{
  "access_token": "TOKEN_JWT",
  "token_type": "bearer"
}
```

Ejemplo de error:

```json
{
  "detail": "Curso no encontrado."
}
```

El frontend debe distinguir entre:

```text
respuesta exitosa
respuesta de validación
respuesta de autenticación
respuesta de recurso inexistente
error interno
```

---

# 12.13 Manejo de Errores

El sistema utiliza códigos HTTP para comunicar el resultado de cada operación.

Los errores pueden originarse en:

- Validación de entrada.
- Autenticación.
- Reglas de negocio.
- Base de datos.
- Servicios externos.
- Conectividad.
- Configuración.

---

## 12.13.1 Error 400

El código:

```text
400 Bad Request
```

puede utilizarse cuando la solicitud es válida a nivel de estructura, pero no cumple una regla de negocio.

Ejemplo conceptual:

```json
{
  "detail": "La operación solicitada no puede completarse."
}
```

---

## 12.13.2 Error 401

El código:

```text
401 Unauthorized
```

indica que el usuario no presentó credenciales válidas.

Puede producirse cuando:

- El token no existe.
- El token expiró.
- El token es inválido.
- Las credenciales son incorrectas.

---

## 12.13.3 Error 403

El código:

```text
403 Forbidden
```

indica que el usuario fue identificado, pero no tiene permiso para acceder al recurso.

Este código debe utilizarse cuando la autorización sea insuficiente.

---

## 12.13.4 Error 404

Courses Service utiliza explícitamente:

```text
404 Not Found
```

cuando no encuentra un curso.

Respuesta:

```json
{
  "detail": "Curso no encontrado."
}
```

El mismo patrón puede aplicarse en otros servicios para:

- Usuario inexistente.
- Docente inexistente.
- Pago inexistente.
- Sesión inexistente.
- Curso inexistente.

---

## 12.13.5 Error 422

FastAPI genera:

```text
422 Unprocessable Entity
```

cuando los datos no cumplen el esquema.

Ejemplos:

- Omitir un campo obligatorio.
- Enviar una cadena donde se espera un entero.
- Enviar un ciclo fuera del rango permitido.
- Enviar una carrera demasiado corta.
- Enviar un cuerpo incompatible con el modelo Pydantic.

Ejemplo de respuesta:

```json
{
  "detail": [
    {
      "loc": [
        "query",
        "career"
      ],
      "msg": "Field required",
      "type": "missing"
    }
  ]
}
```

---

## 12.13.6 Error 500

El código:

```text
500 Internal Server Error
```

se produce cuando ocurre una excepción no controlada.

Posibles causas:

- Fallo de conexión.
- Error SQL.
- Error de serialización.
- Respuesta incompatible con Pydantic.
- Error del proveedor de IA.
- Variable de entorno inexistente.
- Dependencia no disponible.

En producción no deben exponerse trazas internas completas al cliente.

---

# 12.14 Validación de Datos

FastAPI utiliza Pydantic para validar solicitudes y respuestas.

La validación ocurre antes de ejecutar la lógica principal.

Esto evita que datos incompatibles lleguen a la capa de servicio.

---

## 12.14.1 Validación de Parámetros Query

Study Service aplica validaciones como:

```python
career: str = Query(
    ...,
    min_length=3,
)
```

Esto exige una cadena de al menos tres caracteres.

También utiliza:

```python
cycle: int | None = Query(
    default=None,
    ge=1,
    le=10,
)
```

El ciclo debe encontrarse entre 1 y 10.

---

## 12.14.2 Validación de Parámetros Path

Los parámetros declarados como enteros son convertidos automáticamente.

Ejemplo:

```python
user_id: int
```

Si el cliente envía:

```text
/user/abc
```

FastAPI devuelve un error de validación.

---

## 12.14.3 Validación de Cuerpos JSON

Questions Service recibe:

```python
payload: AskQuestionRequest
```

Payments Service recibe:

```python
payload: PayPaymentRequest
```

FastAPI valida el cuerpo antes de ejecutar el servicio.

Esto garantiza que los atributos utilizados existan y tengan el tipo esperado.

---

## 12.14.4 Validación de Respuestas

Los `response_model` también validan la salida.

Ejemplo:

```python
response_model=list[TeacherResponse]
```

Si el servicio devuelve una estructura incompatible, FastAPI puede generar un error interno de validación.

Esta verificación ayuda a detectar inconsistencias entre:

- Repositorio.
- Servicio.
- Esquema.
- Endpoint.

---

# 12.15 Manejo de Sesión JWT

El sistema utiliza JSON Web Token para autenticar usuarios.

El token se genera después de un inicio de sesión correcto.

La respuesta contiene:

```json
{
  "access_token": "TOKEN",
  "token_type": "bearer"
}
```

El frontend debe conservar el token durante la sesión activa.

Para acceder a rutas protegidas se envía:

```http
Authorization: Bearer TOKEN
```

---

## 12.15.1 Estructura del Token

El JWT contiene información firmada.

La implementación utiliza:

```text
HS256
```

El campo principal empleado es:

```text
sub
```

En la implementación actual, `sub` identifica al usuario mediante su correo electrónico.

---

## 12.15.2 Expiración

La duración del token se controla mediante:

```env
ACCESS_TOKEN_EXPIRE_MINUTES
```

Cuando el tiempo expira, el usuario debe iniciar sesión nuevamente o utilizar un mecanismo de renovación si se implementa en el futuro.

---

## 12.15.3 Cierre de Sesión

El cierre de sesión en el frontend consiste principalmente en:

1. Eliminar el token almacenado.
2. Eliminar datos temporales del usuario.
3. Limpiar el contexto de autenticación.
4. Redirigir al login.

Si no existe una lista de revocación en el backend, el token permanece técnicamente válido hasta su expiración, aunque el frontend ya no lo conserve.

---

## 12.15.4 Protección de Recursos

La ruta:

```text
GET /api/v1/users/me
```

utiliza el token para identificar al usuario autenticado.

Los demás routers proporcionados no muestran una dependencia JWT explícita.

Por ello, una mejora de seguridad consiste en proteger las rutas que reciben:

```text
user_id
payment_id
session_id
```

y obtener el usuario directamente desde el token.

---

# 12.16 Secuencia Completa del Chatbot

La interacción con el chatbot combina frontend, backend, base de datos y proveedor de inteligencia artificial.

El flujo completo es:

```text
Usuario
    ↓
Escribe una pregunta
    ↓
Frontend valida que no esté vacía
    ↓
Frontend muestra estado de carga
    ↓
POST /api/v1/questions/ask
    ↓
FastAPI valida AskQuestionRequest
    ↓
QuestionService procesa la consulta
    ↓
Recupera contexto cuando existe session_id
    ↓
Prepara la solicitud para IA
    ↓
Proveedor de IA genera respuesta
    ↓
QuestionService recibe el resultado
    ↓
¿persist = true?
    ├── Sí → guarda mensajes
    └── No → omite persistencia
    ↓
FastAPI valida AskQuestionResponse
    ↓
Frontend recibe JSON
    ↓
Actualiza la conversación
    ↓
Oculta estado de carga
```

---

## 12.16.1 Inicio de una Nueva Sesión

Una nueva conversación utiliza:

```json
{
  "user_id": 15,
  "question": "¿Qué cursos debo llevar para especializarme en DevOps?",
  "session_id": null,
  "persist": true
}
```

El valor:

```json
"session_id": null
```

indica que no existe una sesión anterior.

El servicio puede crear una nueva sesión cuando la persistencia está habilitada.

---

## 12.16.2 Continuación de una Sesión

Para continuar una conversación:

```json
{
  "user_id": 15,
  "question": "¿Cuál de esas certificaciones debería obtener primero?",
  "session_id": 8,
  "persist": true
}
```

Question Service utiliza `session_id` para recuperar o vincular el contexto.

---

## 12.16.3 Consulta Temporal

También puede enviarse:

```json
{
  "user_id": 15,
  "question": "¿Qué significa integración continua?",
  "session_id": null,
  "persist": false
}
```

En este caso, la conversación no debe conservarse permanentemente.

---

## 12.16.4 Recuperación del Historial

El frontend consulta las sesiones mediante:

```text
GET /api/v1/questions/sessions/{user_id}
```

Después selecciona una sesión y obtiene sus mensajes:

```text
GET /api/v1/questions/sessions/{session_id}/messages
```

El flujo es:

```text
Pantalla de historial
    ↓
Consultar sesiones
    ↓
Mostrar lista
    ↓
Usuario selecciona una sesión
    ↓
Consultar mensajes
    ↓
Reconstruir conversación
```

---

# 12.17 Secuencia Completa del Registro

El registro de un estudiante no se limita a insertar un usuario.

La implementación actual incluye inscripción automática.

El flujo general es:

```text
Usuario completa formulario
    ↓
Frontend valida campos básicos
    ↓
POST /api/v1/users/register
    ↓
Auth Service valida solicitud
    ↓
Verifica correo existente
    ↓
Genera hash de contraseña
    ↓
Inserta usuario
    ↓
Determina información académica
    ↓
Ejecuta inscripción automática
    ↓
Relaciona cursos
    ↓
Confirma transacción
    ↓
Frontend muestra resultado
```

Esta lógica permite que el módulo Cursos tenga información disponible inmediatamente después del registro.

---

## 12.17.1 Datos Académicos

El registro puede incluir datos relacionados con:

- Carrera.
- Ciclo.
- Universidad.
- Correo institucional.
- Nombre completo.

La implementación exacta depende de `UserCreate`.

Estos datos permiten resolver la configuración académica inicial.

---

## 12.17.2 Inscripción Automática

La inscripción automática evita que el estudiante tenga que seleccionar manualmente todos los cursos iniciales.

El sistema identifica los cursos aplicables y crea las relaciones necesarias.

El resultado se consulta posteriormente mediante:

```text
GET /api/v1/courses/my-courses/{user_id}
```

---

# 12.18 Secuencia del Módulo Estudio

El módulo Estudio puede ejecutar distintos recorridos.

---

## 12.18.1 Consulta de Malla Curricular

```text
Usuario abre Estudio
    ↓
Selecciona malla curricular
    ↓
Frontend obtiene carrera
    ↓
GET /api/v1/study/curriculum
    ↓
StudyService
    ↓
Consulta PostgreSQL
    ↓
Respuesta por cursos
    ↓
Frontend agrupa por ciclo
```

---

## 12.18.2 Consulta de Malla Completa

```text
GET /api/v1/study/curriculum/full
```

Esta operación devuelve una estructura completa dentro de un único objeto.

Se utiliza cuando la pantalla necesita la organización integral del plan.

---

## 12.18.3 Consulta de Prerrequisitos

```text
Usuario selecciona curso
    ↓
GET /course-prerequisites/{course_reference}
    ↓
Buscar curso
    ↓
Buscar dependencias previas
    ↓
Mostrar prerrequisitos
```

---

## 12.18.4 Consulta de Cursos Desbloqueados

```text
Usuario selecciona curso
    ↓
GET /course-unlocks/{course_reference}
    ↓
Buscar relaciones posteriores
    ↓
Mostrar asignaturas habilitadas
```

---

## 12.18.5 Ruta de Especialización

```text
Usuario selecciona área
    ↓
GET /specialization-path
    ↓
Enviar área, carrera y plan
    ↓
StudyService calcula ruta
    ↓
Frontend muestra cursos recomendados
```

---

# 12.19 Secuencia del Módulo Cursos

El módulo Cursos utiliza información consolidada de distintas tablas.

---

## 12.19.1 Carga Inicial

```text
Usuario abre Cursos
    ↓
Frontend obtiene user_id
    ↓
GET /my-courses/{user_id}
    ↓
CourseService
    ↓
CourseRepository
    ↓
Consulta matrículas
    ↓
Lista de cursos
```

---

## 12.19.2 Consulta de Detalle

```text
Usuario selecciona curso
    ↓
GET /detail/{course_reference}
    ↓
Buscar curso
    ↓
Buscar sección activa
    ↓
Buscar horarios
    ↓
Buscar sílabo
    ↓
Construir respuesta
    ↓
Mostrar detalle
```

---

## 12.19.3 Curso No Encontrado

Cuando la referencia no coincide con un curso:

```json
{
  "detail": "Curso no encontrado."
}
```

El frontend debe:

1. Detener el indicador de carga.
2. Mostrar un mensaje controlado.
3. Evitar intentar renderizar datos inexistentes.
4. Permitir regresar a la lista.

---

# 12.20 Secuencia del Módulo Pagos

El módulo Pagos combina consultas de lectura y una operación de actualización.

---

## 12.20.1 Carga del Resumen

```text
Usuario abre Pagos
    ↓
GET /summary/{user_id}
    ↓
PaymentService
    ↓
Consulta obligaciones
    ↓
Calcula resumen
    ↓
Frontend muestra estado
```

---

## 12.20.2 Consulta de Pendientes

```text
GET /pending/{user_id}
```

El frontend puede aplicar un periodo:

```text
?academic_period_code=202601
```

---

## 12.20.3 Consulta de Vencidos

```text
GET /overdue/{user_id}
```

El servicio filtra las obligaciones vencidas según su implementación interna.

---

## 12.20.4 Ejecución del Pago

```text
Usuario selecciona deuda
    ↓
Selecciona método
    ↓
POST /pay/{payment_id}
    ↓
PaymentService valida operación
    ↓
Actualiza persistencia
    ↓
Devuelve confirmación
    ↓
Frontend recarga resumen
```

Después de un pago exitoso, el frontend debe actualizar:

- Lista de pendientes.
- Lista de vencidos.
- Historial.
- Resumen de cuenta.

---

# 12.21 Secuencia del Módulo Docentes

El módulo Docentes obtiene información general y personalizada.

---

## 12.21.1 Listado General

```text
GET /api/v1/teachers/
```

Devuelve todos los docentes registrados.

---

## 12.21.2 Docentes del Estudiante

```text
Usuario abre Docentes
    ↓
GET /my-teachers/{user_id}
    ↓
TeacherService
    ↓
Consulta cursos del estudiante
    ↓
Relaciona docentes
    ↓
Devuelve lista personalizada
```

---

## 12.21.3 Detalle del Docente

```text
Usuario selecciona docente
    ↓
GET /detail/{teacher_reference}
    ↓
TeacherService
    ↓
Localiza docente
    ↓
Consulta información relacionada
    ↓
Devuelve detalle
```

El periodo académico puede enviarse mediante:

```text
?academic_period=202601
```

---

# 12.22 Estados de Carga en el Frontend

Cada solicitud debe manejar un estado de carga.

El flujo recomendado es:

```text
Inicio de solicitud
    ↓
loading = true
    ↓
Deshabilitar acciones repetidas
    ↓
Mostrar indicador
    ↓
Esperar respuesta
    ↓
Procesar resultado
    ↓
loading = false
```

Esto evita solicitudes duplicadas.

En operaciones sensibles, como registro, login, chatbot o pagos, el botón debe permanecer deshabilitado mientras la solicitud está en curso.

---

# 12.23 Manejo de Errores en la Aplicación Móvil

El frontend debe transformar los errores técnicos en mensajes comprensibles.

Ejemplo técnico:

```json
{
  "detail": "Curso no encontrado."
}
```

Mensaje mostrado:

```text
No se encontró la información del curso seleccionado.
```

Ejemplo de conectividad:

```text
Network request failed
```

Mensaje mostrado:

```text
No fue posible conectarse con el servidor. Verifica tu conexión e inténtalo nuevamente.
```

---

## 12.23.1 Estructura de Control

Ejemplo conceptual:

```typescript
try {
  setLoading(true);

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ?? "Error en la solicitud");
  }

  setResult(data);
} catch (error) {
  setError(
    error instanceof Error
      ? error.message
      : "Ocurrió un error inesperado"
  );
} finally {
  setLoading(false);
}
```

---

# 12.24 Disponibilidad de los Microservicios

Debido a la arquitectura distribuida, un microservicio puede fallar sin que todos los demás dejen de funcionar.

Ejemplo:

```text
Auth Service disponible
Study Service disponible
Courses Service disponible
Questions Service no disponible
Payments Service disponible
Teachers Service disponible
```

En ese escenario:

- El usuario puede iniciar sesión.
- Puede consultar cursos.
- Puede consultar pagos.
- No puede usar temporalmente el chatbot.

La aplicación debe mostrar un error específico del módulo afectado.

---

# 12.25 Diagnóstico por Capas

Cuando una funcionalidad falla, la revisión debe realizarse en orden.

```text
1. Frontend
2. Red local o Internet
3. Nginx
4. Contenedor
5. FastAPI
6. Variables de entorno
7. Base de datos
8. Servicio externo
```

---

## 12.25.1 Comprobación del Frontend

Verificar:

- URL base.
- Puerto.
- Ruta.
- Método HTTP.
- Cuerpo.
- Encabezados.
- Identificador utilizado.
- Mensaje de error.

---

## 12.25.2 Comprobación del Servicio

Ejecutar:

```text
GET /health
```

Si responde, FastAPI está activo.

Después ejecutar:

```text
GET /db-check
```

Si falla, el problema se encuentra en la conexión con PostgreSQL.

---

## 12.25.3 Comprobación del Contenedor

```bash
docker ps
```

Luego:

```bash
docker logs NOMBRE_DEL_CONTENEDOR
```

En despliegue integrado:

```bash
docker compose -f docker-compose.prod.yml ps
```

```bash
docker compose -f docker-compose.prod.yml logs -f
```

---

# 12.26 Consistencia de Identificadores

La implementación actual utiliza identificadores en rutas como:

```text
user_id
payment_id
session_id
```

También utiliza referencias textuales:

```text
course_reference
teacher_reference
```

El frontend debe conservar el identificador correcto para cada operación.

No debe utilizar el nombre visible cuando el endpoint espera un ID numérico, salvo en las rutas que aceptan una referencia textual.

---

# 12.27 Integración con Nginx

Nginx centraliza el acceso a los microservicios.

El flujo es:

```text
Cliente
    ↓
Puerto público
    ↓
Nginx
    ↓
Regla de ubicación
    ↓
Contenedor correspondiente
```

La ventaja principal es que el frontend utiliza una única dirección base.

Nginx se encarga de dirigir cada prefijo.

Ejemplo conceptual:

```text
/api/v1/users      → auth-service
/api/v1/study      → study-service
/api/v1/courses    → courses-service
/api/v1/payments   → payments-service
/api/v1/questions  → questions-service
/api/v1/teachers   → teachers-service
```

---

# 12.28 Dependencia de Supabase

Todos los microservicios que consultan información académica dependen de PostgreSQL.

Si Supabase no está disponible:

- `db-check` falla.
- Las consultas de cursos fallan.
- Las consultas de pagos fallan.
- Las consultas de docentes fallan.
- El historial del chatbot puede fallar.
- El registro puede fallar.

Por ello, la conectividad con Supabase constituye una dependencia crítica.

---

# 12.29 Dependencia del Proveedor de Inteligencia Artificial

Questions Service depende adicionalmente del proveedor configurado para generar respuestas.

Si PostgreSQL funciona, pero el proveedor de IA falla:

- Las sesiones pueden seguir siendo consultadas.
- Los mensajes históricos pueden seguir mostrándose.
- Las nuevas respuestas pueden fallar.

El sistema debe distinguir entre:

```text
error de base de datos
error del proveedor de IA
error de validación
error de red
```

---

# 12.30 Cierre del Capítulo

El funcionamiento de Academic Chatbot Platform se basa en una secuencia coordinada entre la aplicación móvil, Nginx, los microservicios, SQLAlchemy, Supabase PostgreSQL y el proveedor de inteligencia artificial.

Cada solicitud sigue un flujo definido:

```text
Interacción
    ↓
Solicitud HTTP
    ↓
Validación
    ↓
Servicio
    ↓
Persistencia o procesamiento
    ↓
Respuesta JSON
    ↓
Actualización de interfaz
```

Los módulos Estudio, Cursos, Pagos, Preguntas y Docentes se encuentran desacoplados, pero comparten mecanismos comunes de acceso a datos, validación y respuesta.

La arquitectura permite aislar responsabilidades, diagnosticar fallos por servicio y mantener una evolución modular del sistema.

# CAPÍTULO 13. Despliegue de la Plataforma

## 13.1 Introducción

El despliegue corresponde al proceso mediante el cual la plataforma pasa del entorno de desarrollo a un entorno de ejecución estable, donde todos los componentes funcionan de manera integrada.

Academic Chatbot Platform utiliza una arquitectura basada en contenedores Docker, lo que permite encapsular cada microservicio junto con sus dependencias, garantizando que la aplicación pueda ejecutarse de forma consistente en distintos entornos.

La infraestructura implementada se compone de:

- Servidor Ubuntu sobre AWS EC2.
- Docker Engine.
- Docker Compose.
- Nginx como API Gateway.
- Microservicios FastAPI.
- Base de datos PostgreSQL administrada mediante Supabase.
- Aplicación móvil React Native desarrollada con Expo.

Cada componente cumple una responsabilidad específica dentro del proceso de despliegue.

---

# 13.2 Arquitectura de Despliegue

La plataforma utiliza una arquitectura distribuida donde los servicios se ejecutan en contenedores independientes.

```text
                     Internet
                         │
                         ▼
                AWS EC2 (Ubuntu)
                         │
                Docker Compose
                         │
      ┌─────────────────────────────────┐
      │                                 │
      │            Nginx                │
      │        (API Gateway)            │
      │                                 │
      └──────────────┬──────────────────┘
                     │
     ┌───────────────┼───────────────────────────────┐
     │               │               │               │
     ▼               ▼               ▼               ▼
 Auth Service   Study Service   Courses Service  Payments Service
     │               │               │               │
     ├───────────────┼───────────────┼───────────────┤
                     │
                     ▼
             Questions Service
                     │
                     ▼
             Teachers Service
                     │
                     ▼
          Supabase PostgreSQL
```

Cada servicio puede reiniciarse de forma independiente sin afectar necesariamente al resto de componentes.

---

# 13.3 Contenedores Docker

Cada microservicio se ejecuta dentro de un contenedor Docker independiente.

Actualmente la plataforma contiene los siguientes contenedores principales:

```text
nginx
auth-service
study-service
courses-service
payments-service
questions-service
teachers-service
```

Cada contenedor contiene:

- Sistema operativo base.
- Python.
- Dependencias del proyecto.
- Código fuente.
- Variables de entorno.
- Servidor Uvicorn.

Esto evita instalar dependencias directamente sobre el servidor Ubuntu.

---

# 13.4 Docker Compose

La orquestación de todos los servicios se realiza mediante Docker Compose.

En lugar de iniciar cada contenedor manualmente, Docker Compose permite levantar toda la arquitectura mediante un único comando.

El archivo principal define:

- Contenedores.
- Redes.
- Variables de entorno.
- Volúmenes.
- Puertos.
- Dependencias.

El flujo es:

```text
docker compose
        │
        ▼
Lee docker-compose.prod.yml
        │
        ▼
Construye imágenes
        │
        ▼
Crea red Docker
        │
        ▼
Levanta contenedores
        │
        ▼
Todos los servicios disponibles
```

Esta estrategia simplifica considerablemente el despliegue.

---

# 13.5 Construcción de Imágenes

Cada microservicio posee su propio Dockerfile.

Durante el despliegue Docker ejecuta el siguiente proceso:

```text
Dockerfile
      │
      ▼
Descarga imagen base
      │
      ▼
Instala Python
      │
      ▼
Instala requirements.txt
      │
      ▼
Copia código fuente
      │
      ▼
Configura variables
      │
      ▼
Define comando de inicio
      │
      ▼
Genera imagen Docker
```

Cada imagen contiene únicamente los elementos necesarios para ejecutar su respectivo servicio.

---

# 13.6 Redes Docker

Docker Compose crea automáticamente una red privada donde todos los contenedores pueden comunicarse.

El flujo interno es:

```text
Nginx
    │
    ├────────► auth-service
    ├────────► study-service
    ├────────► courses-service
    ├────────► payments-service
    ├────────► questions-service
    └────────► teachers-service
```

Esta comunicación ocurre dentro de la red Docker sin exponer cada servicio directamente a Internet.

El único punto público corresponde a Nginx.

---

# 13.7 API Gateway

La plataforma utiliza Nginx como API Gateway.

Su función consiste en recibir todas las solicitudes provenientes del cliente y redirigirlas al microservicio correspondiente.

Ejemplo:

```text
/api/v1/users
        │
        ▼
Auth Service
```

```text
/api/v1/study
        │
        ▼
Study Service
```

```text
/api/v1/courses
        │
        ▼
Courses Service
```

```text
/api/v1/payments
        │
        ▼
Payments Service
```

```text
/api/v1/questions
        │
        ▼
Questions Service
```

```text
/api/v1/teachers
        │
        ▼
Teachers Service
```

Gracias a esta arquitectura el frontend utiliza una única URL base.

---

# 13.8 Comunicación con Supabase

Supabase proporciona la base de datos PostgreSQL utilizada por todos los microservicios.

Cada servicio establece una conexión mediante SQLAlchemy utilizando la variable:

```text
DATABASE_URL
```

El flujo es:

```text
Microservicio
      │
      ▼
SQLAlchemy
      │
      ▼
PostgreSQL
(Supabase)
```

La base de datos permanece fuera del servidor EC2, permitiendo mantener persistencia incluso si los contenedores son reconstruidos.

---

# 13.9 Variables de Entorno

Cada microservicio utiliza un archivo `.env` para separar la configuración del código fuente.

Entre las variables utilizadas se encuentran:

- Nombre de la aplicación.
- Entorno.
- Clave JWT.
- Algoritmo de autenticación.
- Tiempo de expiración del token.
- Cadena de conexión PostgreSQL.
- Credenciales de RabbitMQ (cuando corresponda).
- API Keys.
- Configuración del proveedor de IA.

Esta estrategia evita almacenar información sensible directamente en el repositorio Git.

---

# 13.10 Inicio del Sistema

El proceso completo de inicio puede resumirse de la siguiente forma:

```text
Servidor Ubuntu
        │
        ▼
Docker Engine
        │
        ▼
Docker Compose
        │
        ▼
Construcción de imágenes
        │
        ▼
Inicio de contenedores
        │
        ▼
Nginx
        │
        ▼
Microservicios
        │
        ▼
Conexión a Supabase
        │
        ▼
Sistema disponible
```

Una vez iniciado el entorno, la aplicación móvil puede consumir la API mediante el gateway configurado.


# CAPÍTULO 14. Pruebas y Validación del Sistema

## 14.1 Introducción

Una vez implementados los microservicios y desarrollada la aplicación móvil, fue necesario verificar que cada componente funcionara correctamente tanto de manera individual como de forma integrada.

El proceso de validación tuvo como objetivo comprobar que los requisitos funcionales definidos durante el análisis fueran cumplidos por la implementación desarrollada.

Las pruebas realizadas abarcaron distintos niveles del sistema, incluyendo la validación de endpoints REST, la comunicación entre microservicios, el acceso a la base de datos, la autenticación mediante JWT y el funcionamiento de la aplicación móvil.

El enfoque empleado permitió detectar errores de configuración, inconsistencias entre modelos de datos y problemas de integración antes del despliegue final.

---

# 14.2 Estrategia de Pruebas

La validación de Academic Chatbot Platform se realizó siguiendo una estrategia incremental.

En primer lugar se verificó el funcionamiento individual de cada microservicio.

Posteriormente se comprobó la comunicación con la base de datos PostgreSQL.

Finalmente se realizaron pruebas integradas utilizando la aplicación móvil.

El proceso general fue el siguiente:

```text
Microservicio
      │
      ▼
Pruebas Unitarias de Endpoints
      │
      ▼
Pruebas Base de Datos
      │
      ▼
Pruebas Integración
      │
      ▼
Pruebas Frontend
      │
      ▼
Validación Completa
```

Cada etapa permitió identificar posibles errores antes de avanzar hacia la siguiente.

---

# 14.3 Objetivos de las Pruebas

Las pruebas realizadas buscaron verificar los siguientes aspectos:

- Disponibilidad de cada microservicio.
- Correcta comunicación entre FastAPI y PostgreSQL.
- Funcionamiento de la autenticación.
- Registro de nuevos usuarios.
- Consulta de información académica.
- Consulta de cursos matriculados.
- Consulta de docentes.
- Consulta de pagos.
- Funcionamiento del chatbot.
- Persistencia del historial de conversaciones.
- Integración completa con la aplicación móvil.

---

# 14.4 Entorno de Pruebas

Las pruebas fueron realizadas utilizando el entorno de desarrollo implementado durante el proyecto.

Los componentes utilizados fueron:

| Componente | Tecnología |
|------------|------------|
| Sistema operativo | Windows 11 |
| Backend | FastAPI |
| Frontend | React Native + Expo |
| Base de datos | Supabase PostgreSQL |
| Contenedores | Docker |
| Gateway | Nginx |
| Lenguaje | Python 3.13 |
| Cliente API | Swagger y Postman |

Todas las pruebas fueron ejecutadas utilizando la misma arquitectura descrita en los capítulos anteriores.

---

# 14.5 Validación del Inicio de los Microservicios

La primera prueba consistió en comprobar que cada microservicio iniciara correctamente.

Para ello se verificó:

- Inicio sin errores.
- Carga de variables de entorno.
- Creación de la aplicación FastAPI.
- Registro de routers.
- Disponibilidad del endpoint `/health`.

El procedimiento fue:

```text
Iniciar contenedor
        │
        ▼
Esperar inicio de Uvicorn
        │
        ▼
Consultar /health
        │
        ▼
Validar respuesta
```

Una respuesta satisfactoria fue:

```json
{
    "service": "...",
    "status": "healthy"
}
```

Este resultado confirmó que el servicio se encontraba disponible.

---

# 14.6 Validación de Conectividad con PostgreSQL

Después de iniciar cada servicio se verificó la conexión con Supabase.

Para ello se utilizó:

```text
GET /db-check
```

Internamente cada microservicio ejecutó:

```sql
SELECT 1 AS ok;
```

La respuesta esperada fue:

```json
{
    "database": "connected",
    "result": {
        "ok": 1
    }
}
```

Esta prueba confirmó:

- conexión válida;
- autenticación correcta;
- disponibilidad del servidor PostgreSQL.

---

# 14.7 Validación de la Autenticación

El proceso de autenticación fue validado mediante el endpoint:

```text
POST /api/v1/users/login
```

Las pruebas realizadas fueron:

## Login correcto

Se utilizaron credenciales válidas.

Resultado esperado:

- código HTTP 200;
- generación del token JWT;
- acceso al sistema.

---

## Usuario inexistente

Se utilizó un correo no registrado.

Resultado esperado:

```text
401 Unauthorized
```

---

## Contraseña incorrecta

Se utilizó una contraseña inválida.

Resultado esperado:

```text
401 Unauthorized
```

---

## Token JWT

Una vez autenticado se verificó:

- generación del token;
- formato Bearer;
- utilización en rutas protegidas.

---

# 14.8 Validación del Registro

Se verificó el endpoint:

```text
POST /api/v1/users/register
```

Los escenarios considerados fueron:

- registro válido;
- correo duplicado;
- campos obligatorios;
- formato de correo;
- creación del usuario.

Además se comprobó la inscripción automática implementada por Auth Service.

Una vez registrado el usuario fue posible consultar inmediatamente sus cursos mediante Courses Service.

---

# 14.9 Validación del Módulo Estudio

Las pruebas del módulo Estudio incluyeron:

- consulta de malla curricular;
- consulta de prerrequisitos;
- consulta de cursos desbloqueados;
- consulta de certificaciones;
- consulta de ruta de aprendizaje.

Cada endpoint respondió utilizando los modelos Pydantic definidos durante la implementación.

Se verificó que la información fuera consistente con la base de datos.

---

# 14.10 Validación del Módulo Cursos

Se probaron los siguientes endpoints:

```text
GET /courses/

GET /courses/my-courses/{user_id}

GET /courses/detail/{course_reference}

GET /courses/schedule/{course_reference}

GET /courses/syllabus/{course_reference}
```

Las pruebas incluyeron:

- curso existente;
- curso inexistente;
- estudiante sin cursos;
- consulta por código;
- consulta por nombre.

También se comprobó la respuesta:

```json
{
    "detail":"Curso no encontrado."
}
```

cuando el curso solicitado no existía.

---

# 14.11 Validación del Módulo Pagos

Las pruebas realizadas fueron:

- consulta de pagos pendientes;
- consulta de pagos vencidos;
- historial de pagos;
- resumen de cuenta;
- simulación de pago.

Para el endpoint:

```text
POST /payments/pay/{payment_id}
```

se verificó:

- recepción del cuerpo JSON;
- lectura del método de pago;
- respuesta del servicio.

---

# 14.12 Validación del Módulo Docentes

Las pruebas contemplaron:

- listado general;
- docentes del estudiante;
- detalle del docente.

Se verificó además el filtro:

```text
academic_period
```

cuando era enviado como parámetro de consulta.

---

# 14.13 Validación del Chatbot

El módulo Preguntas fue sometido a distintas pruebas.

Entre ellas:

- pregunta simple;
- continuación de conversación;
- nueva sesión;
- historial;
- recuperación de mensajes.

Se verificó además el funcionamiento del parámetro:

```text
persist
```

para comprobar el almacenamiento del historial.

---

# 14.14 Validación desde Swagger

Swagger permitió ejecutar directamente todos los endpoints desarrollados.

El procedimiento fue:

1. abrir `/docs`;
2. seleccionar endpoint;
3. ingresar parámetros;
4. ejecutar;
5. validar código HTTP;
6. validar respuesta JSON.

Esto permitió comprobar el correcto funcionamiento de la API antes de integrarla con la aplicación móvil.

---

# 14.15 Validación desde Postman

Además de Swagger se utilizó Postman para construir colecciones de pruebas.

Las ventajas fueron:

- reutilización de solicitudes;
- modificación de encabezados;
- uso de variables;
- almacenamiento de respuestas;
- pruebas manuales repetitivas.

Postman permitió validar la API de forma independiente al frontend.

---

# 14.16 Validación desde la Aplicación Móvil

Finalmente se realizaron pruebas completas utilizando la aplicación React Native.

Se verificó el funcionamiento de:

- Login.
- Registro.
- Home.
- Estudio.
- Cursos.
- Pagos.
- Preguntas.
- Docentes.

Cada pantalla consumió los endpoints correspondientes mediante HTTP.

La comunicación fue realizada utilizando la URL configurada para el entorno de desarrollo.

---

# 14.17 Pruebas de Integración

Las pruebas de integración comprobaron la comunicación entre varios componentes simultáneamente.

Por ejemplo:

```text
Usuario

↓

Login

↓

JWT

↓

Consulta Cursos

↓

Consulta Docentes

↓

Consulta Pagos

↓

Consulta Chatbot
```

Durante estas pruebas se verificó que la información obtenida por un servicio pudiera ser utilizada correctamente por otro.

Un ejemplo es el uso de `user_id`, generado durante el proceso de autenticación y utilizado posteriormente por los demás microservicios.

---

# 14.18 Resultados Obtenidos

Las pruebas realizadas permitieron confirmar que:

- los microservicios iniciaron correctamente;
- la comunicación con PostgreSQL fue exitosa;
- la autenticación mediante JWT funcionó correctamente;
- los endpoints respondieron utilizando los modelos definidos;
- la aplicación móvil consumió correctamente la API;
- el chatbot respondió a las consultas realizadas;
- el historial fue recuperado correctamente;
- los módulos compartieron información de forma consistente.

No se identificaron inconsistencias estructurales entre los contratos REST implementados y los modelos Pydantic utilizados.

---

# 14.19 Limitaciones de las Pruebas

Las pruebas realizadas corresponden principalmente a validaciones funcionales e integradas.

No formaron parte del alcance del proyecto:

- pruebas de carga;
- pruebas de estrés;
- pruebas de rendimiento masivo;
- pruebas de alta disponibilidad;
- pruebas distribuidas sobre múltiples servidores.

Estas actividades pueden incorporarse en futuras etapas del proyecto utilizando herramientas especializadas como JMeter, Locust o k6.

---

# 14.20 Conclusión

Los resultados obtenidos permitieron comprobar que la plataforma cumple con los requisitos funcionales establecidos durante el análisis.

La integración entre React Native, FastAPI, Supabase, Docker y Nginx permitió construir una solución estable y modular.

Las pruebas confirmaron el correcto funcionamiento de los módulos de autenticación, estudio, cursos, pagos, docentes y chatbot, demostrando la viabilidad técnica de la arquitectura propuesta y proporcionando una base sólida para futuras ampliaciones del sistema.


# CAPÍTULO 15. Mantenimiento, Escalabilidad y Buenas Prácticas

## 15.1 Introducción

Todo sistema de software requiere actividades de mantenimiento una vez que entra en funcionamiento. Aunque la implementación inicial cumple con los requisitos funcionales establecidos, la evolución constante de las necesidades académicas hace necesario contar con una arquitectura que facilite la incorporación de nuevas funcionalidades sin afectar los componentes existentes.

Academic Chatbot Platform fue diseñado siguiendo una arquitectura basada en microservicios, lo que permite realizar modificaciones de manera independiente sobre cada dominio funcional.

Esta característica reduce el impacto de los cambios, facilita la identificación de errores y disminuye los tiempos de mantenimiento.

---

# 15.2 Tipos de Mantenimiento

El mantenimiento del sistema puede clasificarse en cuatro categorías principales.

## 15.2.1 Mantenimiento Correctivo

Corresponde a las actividades destinadas a corregir errores detectados durante la operación del sistema.

Ejemplos:

- Corrección de errores en endpoints.
- Solución de fallos de autenticación.
- Corrección de consultas SQL.
- Corrección de respuestas del chatbot.
- Ajustes en validaciones Pydantic.

El proceso general es:

```text
Reporte de incidencia
        │
        ▼
Identificación del problema
        │
        ▼
Corrección del código
        │
        ▼
Pruebas
        │
        ▼
Despliegue
```

---

## 15.2.2 Mantenimiento Adaptativo

Permite adaptar la plataforma a nuevos requerimientos tecnológicos.

Ejemplos:

- Nueva versión de Python.
- Nueva versión de FastAPI.
- Actualización de Expo SDK.
- Cambios en Supabase.
- Cambios en AWS.

Gracias a Docker estas actualizaciones pueden realizarse minimizando el impacto sobre el entorno de producción.

---

## 15.2.3 Mantenimiento Perfectivo

Busca mejorar funcionalidades ya existentes.

Ejemplos:

- Optimización de consultas.
- Mejora de interfaces.
- Reducción de tiempos de respuesta.
- Nuevos filtros.
- Mejor experiencia del usuario.

Este tipo de mantenimiento representa la mayor parte de la evolución del sistema.

---

## 15.2.4 Mantenimiento Preventivo

Tiene como finalidad evitar futuros problemas.

Entre las actividades recomendadas se encuentran:

- actualización de dependencias;
- revisión periódica de logs;
- respaldo de la base de datos;
- revisión de certificados;
- monitoreo del servidor;
- renovación de credenciales.

---

# 15.3 Organización del Código

Cada microservicio mantiene una estructura similar.

```text
app
│
├── config
├── core
├── db
├── middleware
├── models
├── repositories
├── routes
├── schemas
├── services
├── utils
└── main.py
```

Esta organización permite localizar rápidamente cada componente.

Las responsabilidades se encuentran claramente separadas.

---

# 15.4 Principio de Responsabilidad Única

Cada capa posee una única responsabilidad.

## Router

Responsable de:

- recibir solicitudes;
- validar parámetros;
- invocar servicios;
- devolver respuestas.

---

## Service

Responsable de:

- reglas de negocio;
- validaciones funcionales;
- coordinación entre repositorios.

---

## Repository

Responsable de:

- consultas SQL;
- acceso a PostgreSQL;
- persistencia.

---

## Schema

Responsable de:

- validación;
- serialización;
- documentación automática.

---

## Model

Responsable de:

- representar las tablas de la base de datos.

Esta separación facilita el mantenimiento del sistema.

---

# 15.5 Incorporación de Nuevos Microservicios

La arquitectura implementada permite agregar nuevos dominios sin modificar significativamente los existentes.

El proceso recomendado consiste en:

```text
Crear nuevo servicio
        │
        ▼
Crear Dockerfile
        │
        ▼
Agregar compose
        │
        ▼
Configurar Nginx
        │
        ▼
Crear rutas
        │
        ▼
Crear servicios
        │
        ▼
Crear repositorios
        │
        ▼
Desplegar
```

Los servicios actuales continúan funcionando de forma independiente.

---

# 15.6 Incorporación de Nuevos Endpoints

Cuando un módulo requiere nuevas funcionalidades, el proceso recomendado es:

1. Crear el esquema Pydantic.
2. Implementar la lógica en Service.
3. Implementar la consulta en Repository.
4. Crear la ruta correspondiente.
5. Actualizar Swagger.
6. Ejecutar pruebas.
7. Actualizar la documentación.

Este procedimiento mantiene la consistencia entre la implementación y la documentación técnica.

---

# 15.7 Actualización de Dependencias

Las dependencias deben mantenerse actualizadas para garantizar compatibilidad y seguridad.

Entre ellas:

- Python.
- FastAPI.
- SQLAlchemy.
- Uvicorn.
- Pydantic.
- Expo.
- React Native.

Antes de actualizar una dependencia se recomienda:

1. revisar cambios oficiales;
2. actualizar entorno de desarrollo;
3. ejecutar pruebas;
4. desplegar en ambiente de pruebas;
5. finalmente actualizar producción.

---

# 15.8 Gestión de Variables de Entorno

Las variables sensibles no deben almacenarse dentro del código fuente.

Entre ellas:

- SECRET_KEY
- DATABASE_URL
- API Keys
- credenciales
- configuraciones privadas

Cada microservicio utiliza archivos `.env`.

Esta práctica facilita el despliegue en distintos entornos.

---

# 15.9 Copias de Seguridad

La información almacenada constituye uno de los activos más importantes de la plataforma.

Se recomienda realizar respaldos periódicos de:

- usuarios;
- historial del chatbot;
- pagos;
- docentes;
- cursos;
- malla curricular.

Los respaldos pueden almacenarse en servicios externos compatibles con AWS.

---

# 15.10 Monitoreo del Sistema

Durante la operación deben supervisarse distintos indicadores.

Entre ellos:

- uso de CPU;
- memoria RAM;
- utilización de disco;
- disponibilidad de contenedores;
- tiempo de respuesta;
- errores HTTP;
- disponibilidad de PostgreSQL.

El monitoreo permite detectar problemas antes de afectar a los usuarios.

---

# 15.11 Registro de Eventos (Logs)

Cada microservicio debe registrar eventos relevantes.

Ejemplos:

- inicio del servicio;
- errores internos;
- excepciones;
- consultas fallidas;
- problemas de conexión.

Los registros permiten reconstruir el origen de un incidente.

---

# 15.12 Seguridad

Las recomendaciones principales para producción son:

- utilizar HTTPS;
- proteger JWT;
- limitar intentos de login;
- validar entradas;
- ocultar información sensible;
- utilizar variables de entorno;
- restringir acceso a PostgreSQL;
- actualizar dependencias.

Estas prácticas reducen la superficie de ataque del sistema.

---

# 15.13 Escalabilidad Horizontal

Una ventaja importante de los microservicios consiste en poder incrementar únicamente los componentes que presentan mayor carga.

Ejemplo:

```text
                 Nginx
                   │
      ┌────────────┴────────────┐
      ▼                         ▼
Questions Service        Questions Service
      │                         │
      └────────────┬────────────┘
                   ▼
             Supabase
```

En este escenario únicamente el Questions Service es replicado.

Los demás microservicios permanecen sin modificaciones.

---

# 15.14 Escalabilidad Vertical

Otra alternativa consiste en incrementar los recursos del servidor.

Por ejemplo:

- mayor memoria RAM;
- más núcleos CPU;
- mayor almacenamiento;
- mejor ancho de banda.

Esta estrategia resulta sencilla de implementar, aunque presenta límites físicos.

---

# 15.15 Integración Continua

El proyecto incorpora Git como sistema de control de versiones.

El flujo recomendado es:

```text
Developer

↓

Git

↓

GitHub

↓

GitHub Actions

↓

Pruebas automáticas

↓

Despliegue
```

La automatización reduce errores durante la publicación de nuevas versiones.

---

# 15.16 Buenas Prácticas de Desarrollo

Durante el mantenimiento se recomienda:

- mantener nombres consistentes;
- reutilizar componentes;
- documentar nuevas funciones;
- evitar duplicidad de código;
- utilizar tipado;
- separar responsabilidades;
- validar datos;
- realizar pruebas antes del despliegue.

Estas prácticas incrementan la calidad del software.

---

# 15.17 Evolución Futura

La arquitectura implementada facilita la incorporación de nuevos módulos.

Entre las posibles ampliaciones se encuentran:

- notificaciones académicas;
- calendario institucional;
- gestión de documentos;
- asistencia mediante códigos QR;
- videoconferencias;
- analítica académica;
- panel administrativo;
- recomendaciones personalizadas mediante IA.

Estas funcionalidades pueden incorporarse mediante nuevos microservicios sin modificar significativamente los ya existentes.

---

# 15.18 Beneficios de la Arquitectura

La arquitectura implementada proporciona ventajas importantes.

Entre ellas:

- modularidad;
- reutilización;
- mantenibilidad;
- escalabilidad;
- facilidad de despliegue;
- aislamiento de errores;
- independencia entre equipos;
- integración sencilla con nuevos servicios.

Estas características convierten a Academic Chatbot Platform en una plataforma preparada para evolucionar conforme aumenten las necesidades institucionales.

---

# 15.19 Conclusiones del Manual Técnico

El presente manual documentó la arquitectura, implementación, funcionamiento y despliegue de Academic Chatbot Platform.

Se describieron los componentes principales de la solución, la estructura de los microservicios, la comunicación mediante API REST, la integración con PostgreSQL, la utilización de Docker, la administración mediante Nginx y la interacción con la aplicación móvil desarrollada en React Native.

Asimismo, se documentaron los endpoints implementados, los flujos funcionales de cada módulo, las estrategias de despliegue, las pruebas realizadas y las recomendaciones para el mantenimiento futuro.

La arquitectura basada en microservicios permite mantener un bajo acoplamiento entre componentes, facilitando la incorporación de nuevas funcionalidades sin comprometer la estabilidad del sistema existente.

Finalmente, la documentación generada constituye una guía técnica para desarrolladores, administradores del sistema y futuros equipos de mantenimiento, permitiendo comprender la solución implementada y servir como base para futuras ampliaciones de la plataforma.

---

# 15.20 Cierre General

Academic Chatbot Platform representa una solución tecnológica orientada al apoyo académico de estudiantes universitarios mediante una arquitectura moderna basada en microservicios.

La integración de FastAPI, React Native, Docker, Nginx, Supabase PostgreSQL y herramientas de inteligencia artificial permitió desarrollar una plataforma modular, escalable y preparada para futuras extensiones.

El enfoque adoptado favorece la mantenibilidad del software, la reutilización de componentes y la independencia entre dominios funcionales, aspectos fundamentales para garantizar la evolución continua del sistema.

El presente manual técnico documenta de forma integral la implementación realizada, proporcionando una referencia detallada para la instalación, administración, mantenimiento y evolución futura de la plataforma, contribuyendo a asegurar la continuidad del proyecto y facilitando su transferencia tecnológica a nuevos equipos de desarrollo.