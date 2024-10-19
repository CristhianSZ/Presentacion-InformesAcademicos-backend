const express = require("express");
const router = express.Router();

//Importa los controladores de asistencia estudiantil
const {
  actualizarAsistenciaEstudiante,
  crearAsistenciaEstudiante,
  obtenerAsistenciasEstudiantes,
} = require("../controllers/asistenciaAlumnosController");

//Ruta para crear una nueva asistencia
router.post("/", crearAsistenciaEstudiante)

//Ruta para obtener todas las asistencias
router.get("/", obtenerAsistenciasEstudiantes)

//Ruta para actualizar una asistencia
router.put("/:id_estudiante", actualizarAsistenciaEstudiante)

module.exports = router;