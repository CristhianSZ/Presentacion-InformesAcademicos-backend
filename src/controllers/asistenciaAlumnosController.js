const { AsistenciaEstudianteModel } = require("../models/AsistenciaEstudiante");

//Crear una nueva asistencia de estudiante
const crearAsistenciaEstudiante = async (req, res) => {
  const { id_estudiante, fecha, estado } = req.body;
  try {
    const nuevaAsistencia = await AsistenciaEstudianteModel.create({
      id_estudiante,
      fecha,
      estado: estado || "activo",
    });
    res.status(201).json(nuevaAsistencia);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear la asistencia del estudiante" });
  }
};

//Obtener todas las asistencias de estudiantes
/*const obtenerAsistenciasEstudiantes = async (req, res) => {
  try {
    const asistencias = await AsistenciaEstudianteModel.findAll();
    res.status(200).json(asistencias);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al obtener las asistencias de estudiantes" });
  }
};*/
const obtenerAsistenciasEstudiantes = async (req, res) => {
  const limite = parseInt(req.query.limite) || 10;  // Obtén el límite de los parámetros de consulta (query params) o usa 10 por defecto

  try {
    const asistencias = await AsistenciaEstudianteModel.findAll({
      limit: limite  // Limitar la cantidad de registros traídos
    });
    res.status(200).json(asistencias);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las asistencias de estudiantes" });
  }
};

// Actualizar la asistencia de un estudiante
const actualizarAsistenciaEstudiante = async (req, res) => {
  const { id_estudiante } = req.params; // ID del estudiante
  const { fecha, estado } = req.body; // Fecha de la asistencia y nuevo estado

  try {
    // Buscar el registro de asistencia correspondiente a la fecha y estudiante
    const asistenciaActualizada = await AsistenciaEstudianteModel.update(
      { estado }, // Nuevo estado de la asistencia
      { 
        where: { 
          id_estudiante,
          fecha
        }
      }
    );

    // Verificar si la asistencia fue actualizada
    if (asistenciaActualizada[0] === 1) {
      res.status(200).json({ message: "Asistencia actualizada correctamente" });
    } else {
      res.status(404).json({ error: "No se encontró un registro de asistencia para esa fecha" });
    }
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error);
    res.status(500).json({ error: "Error al actualizar la asistencia" });
  }
};

module.exports = { actualizarAsistenciaEstudiante,crearAsistenciaEstudiante,obtenerAsistenciasEstudiantes };
