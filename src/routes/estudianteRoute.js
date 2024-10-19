const express = require("express");
const router = express.Router();

// Importar los controladores de estudiantes
const {
  crearEstudiante,
  obtenerEstudiantes,
  actualizarEstudiante,
  eliminarEstudiante,
} = require("../controllers/estudianteController");

// Ruta para crear un nuevo estudiante
router.post("/", crearEstudiante);

// Ruta para obtener todos los estudiantes
router.get("/", obtenerEstudiantes);

// Ruta para actualizar un estudiante
router.put("/:id_estudiante", actualizarEstudiante);

// Ruta para eliminar un estudiante
router.delete("/:id_estudiante", eliminarEstudiante);

module.exports = router;
