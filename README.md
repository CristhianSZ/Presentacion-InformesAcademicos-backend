# Informes Academicos - Backend API REST

API REST desarrollada con **Node.js** y **Express** para la gestion de informes academicos de una institucion educativa. Permite administrar estudiantes, personal, asistencia, cursos, niveles educativos y localidades geograficas.

> Este repositorio corresponde al **backend** del proyecto. El frontend consume esta API y se encuentra en un repositorio separado.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **Node.js** | Entorno de ejecucion del servidor |
| **Express** | Framework para la creacion de rutas y middlewares |
| **Sequelize** | ORM para la interaccion con la base de datos |
| **MySQL** | Base de datos relacional |
| **dotenv** | Gestion de variables de entorno |
| **Morgan** | Logger de peticiones HTTP |
| **CORS** | Control de acceso entre origenes cruzados |
| **Nodemon** | Recarga automatica en desarrollo |

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura **MVC (Model - View - Controller)** organizada en capas claramente separadas:

```
src/
├── controllers/        # Logica de negocio para cada recurso
│   ├── estudianteController.js
│   ├── personalController.js
│   ├── asistenciaAlumnosController.js
│   ├── cursosController.js
│   ├── localidadController.js
│   └── nivelController.js
├── models/             # Definicion de modelos Sequelize (ORM)
│   ├── Estudiante.js
│   ├── Personal.js
│   ├── AsistenciaEstudiante.js
│   ├── Cursos.js
│   ├── Localidad.js
│   ├── Nivel.js
│   └── Provincia.js
├── routes/             # Definicion de endpoints REST
│   ├── estudianteRoute.js
│   ├── personalRoute.js
│   ├── asistenciaAlumnosRoute.js
│   ├── cursosRoutes.js
│   ├── localidadRoute.js
│   └── nivelRoute.js
├── db.js               # Configuracion de conexion a MySQL con Sequelize
└── index.js            # Punto de entrada de la aplicacion
```

---

## Modelo de Datos

### Entidades principales

- **Estudiante**: Datos personales, contacto, estado (activo/inactivo), relaciones con provincia, localidad y curso.
- **Personal**: Datos personales del personal institucional, con relacion a provincia, localidad y tipo de cargo.
- **Asistencia Estudiante**: Registro de asistencia por estudiante y fecha.
- **Curso**: Cursos disponibles vinculados a un nivel educativo.
- **Nivel**: Niveles educativos (ej. primario, secundario).
- **Localidad**: Localidades con relacion a provincia.
- **Provincia**: Provincias geograficas.

### Relaciones

```
Provincia  1───N  Localidad
Nivel      1───N  Curso
Curso      1───N  Estudiante
Provincia  1───N  Estudiante
Localidad  1───N  Estudiante
Provincia  1───N  Personal
Localidad  1───N  Personal
Estudiante 1───N  AsistenciaEstudiante
```

---

## Endpoints de la API

### Estudiantes `/api/alumnos`

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/alumnos` | Obtener estudiantes activos (paginados) |
| `GET` | `/api/alumnos/allStudent` | Obtener todos los estudiantes activos |
| `POST` | `/api/alumnos` | Crear un nuevo estudiante |
| `PUT` | `/api/alumnos/:id_estudiante` | Actualizar un estudiante |
| `DELETE` | `/api/alumnos/:id_estudiante` | Eliminar estudiante (borrado logico) |

### Personal `/api/personal`

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/personal` | Obtener todo el personal activo |
| `POST` | `/api/personal` | Crear un nuevo registro de personal |
| `PUT` | `/api/personal/:id_Personal` | Actualizar un registro de personal |
| `DELETE` | `/api/personal/:id_Personal` | Eliminar personal (borrado logico) |

### Asistencia de Estudiantes `/api/asistenciaAlumnos`

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/asistenciaAlumnos` | Obtener asistencias (con limite configurable) |
| `POST` | `/api/asistenciaAlumnos` | Registrar nueva asistencia |
| `PUT` | `/api/asistenciaAlumnos/:id_estudiante` | Actualizar asistencia de un estudiante |

### Localidades `/api/localidades`

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/localidades` | Obtener localidades con su provincia |
| `GET` | `/api/localidades/getProvinciasYLocalidades` | Obtener provincias y localidades por separado |

### Cursos `/api/cursos`

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/cursos` | Obtener todos los cursos |

### Niveles `/api/nivel`

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/api/nivel` | Obtener todos los niveles educativos |

---

## Caracteristicas Tecnicas Destacadas

- **Borrado logico**: Los registros de estudiantes y personal no se eliminan fisicamente de la base de datos. Se utiliza un campo `estado` que cambia de `activo` a `inactivo`, preservando la integridad de los datos historicos.
- **Paginacion**: El endpoint de estudiantes soporta paginacion mediante query params (`page`, `limit`), devolviendo metadata de paginacion en la respuesta (`totalEstudiantes`, `currentPage`, `totalPages`).
- **ORM Sequelize**: Toda la interaccion con la base de datos se realiza a traves de Sequelize, evitando queries SQL crudos y facilitando la mantenibilidad.
- **Variables de entorno**: Las credenciales de la base de datos se gestionan de forma segura mediante `dotenv`.
- **CORS configurado**: Control de acceso configurado para permitir comunicacion con el frontend.
- **Logging HTTP**: Todas las peticiones se registran en consola mediante Morgan en modo `dev`.

---

## Instalacion y Ejecucion

### Requisitos previos

- Node.js (v14 o superior)
- MySQL
- npm

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/CristhianSZ/Presentacion-InformesAcademicos-backend.git
cd Presentacion-InformesAcademicos-backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno creando un archivo `.env` en la raiz del proyecto:
```env
PORT=3000
MYSQL_ADDON_DB=nombre_base_datos
MYSQL_ADDON_USER=usuario
MYSQL_ADDON_PASSWORD=contraseña
MYSQL_ADDON_HOST=localhost
MYSQL_ADDON_PORT=3306
```

4. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

5. Iniciar el servidor en modo produccion:
```bash
npm start
```

El servidor estara disponible en `http://localhost:3000`.

---

## Sobre el Frontend

El frontend de esta aplicacion es un proyecto separado que consume esta API REST. Se desarrollo con tecnologias de frontend moderno y se conecta al backend a traves de los endpoints documentados anteriormente.

---

## Autor

Desarrollado por **Cristhian Rodrigo Sosa Zurita**.
