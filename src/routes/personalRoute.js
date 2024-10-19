const express = require("express");
const router = express.Router();

// Importar los controladores de Personal
const {
  crearPersonal,
  obtenerPersonal,
  actualizarPersonal,
  eliminarPersonal,
} = require("../controllers/personalController");

// Ruta para crear un nuevo Personal
router.post("/", crearPersonal);

// Ruta para obtener todos los Personal
router.get("/", obtenerPersonal);

// Ruta para actualizar un Personal
router.put("/:id_Personal", actualizarPersonal);

// Ruta para eliminar un Personal
router.delete("/:id_Personal", eliminarPersonal);

module.exports = router;
