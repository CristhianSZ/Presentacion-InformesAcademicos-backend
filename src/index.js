// Importación de dependencias
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const db = require("./db");

// Configuración de variables de entorno
dotenv.config();

// Inicialización de Express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
      credentials: true,
      maxAge: 86400,
    })
  );
app.use(express.json()); // Parseo de JSON
app.use(morgan("dev")); // Logger de peticiones HTTP

// Importación de routers
const alumnoRouter = require("./routes/estudianteRoute");
const personalRouter = require("./routes/personalRoute");
const asistenciaAlumnosRouter = require("./routes/asistenciaAlumnosRoute");
const localidadRoutes = require("./routes/localidadRoute")
const cursosRoutes = require("./routes/cursosRoutes")
const nivelRoutes = require("./routes/nivelRoute")
// Rutas
app.use("/api/alumnos", alumnoRouter); // Rutas para estudiantes
app.use("/api/personal", personalRouter); // Rutas para personal
app.use("/api/asistenciaAlumnos", asistenciaAlumnosRouter); // Rutas para asistencia de estudiantes
app.use("/api/localidades", localidadRoutes); // Rutas para localidades
app.use("/api/cursos", cursosRoutes); // Rutas para cursos
app.use("/api/nivel", nivelRoutes); // Rutas para nivel
// Función de conexión a la base de datos
const conexionDB = async () => {
    try {
        await db.authenticate();
        console.log("Conectado correctamente a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

// Inicio del servidor
app.listen(port, () => {
    conexionDB(); // Conectar a la base de datos antes de levantar el servidor
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
