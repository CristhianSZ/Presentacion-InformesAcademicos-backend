const { EstudianteModel } = require("../models/Estudiante");

// Crear un nuevo estudiante
const crearEstudiante = async (req, res) => {
  const {
    nombre,
    apellido,
    DNI,
    direccion_calle,
    calle_numero,
    telefono,
    email,
    grupo_sanguineo,
    fecha_nacimiento,
    cuil,
    id_provincia,
    id_localidad,
    id_curso,
    estado,
  } = req.body;
  try {
    const nuevoEstudiante = await EstudianteModel.create({
      nombre,
      apellido,
      DNI,
      direccion_calle,
      calle_numero,
      telefono,
      email,
      grupo_sanguineo,
      fecha_nacimiento,
      cuil,
      id_provincia,
      id_localidad,
      id_curso,
      estado: estado || "activo",
    });
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el estudiante" });
  }
};

// Obtener todos los estudiantes
const obtenerEstudiantes = async (req, res) => {
  try {
    // Obtener los parámetros de paginación de la consulta
    const page = parseInt(req.query.page) || 1;  // Página actual (default a 1)
    const limit = parseInt(req.query.limit) || 10;  // Número de estudiantes por página (default a 10)
    const offset = (page - 1) * limit;  // Calcula el desplazamiento

    // Obtener el total de estudiantes activos
    const totalEstudiantes = await EstudianteModel.count({
      where: { estado: "activo" }
    });

    // Consulta con paginación (limit y offset)
    const estudiantes = await EstudianteModel.findAll({
      where: { estado: "activo" },
      limit: limit,
      offset: offset
    });

    // Devolver los estudiantes junto con información de paginación
    res.json({
      estudiantes: estudiantes,
      totalEstudiantes: totalEstudiantes,
      currentPage: page,
      totalPages: Math.ceil(totalEstudiantes / limit)  // Total de páginas
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los estudiantes" });
  }
};
const obtenerTodosEstudiantes = async (req, res) => {
  try {
    // Obtener todos los estudiantes activos
    const estudiantes = await EstudianteModel.findAll({
      where: { estado: "activo" }
    });

    // Devolver los estudiantes
    res.status(200).json(estudiantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los estudiantes" });
  }
};

// Actualizar un estudiante
// Actualizar un estudiante
const actualizarEstudiante = async (req, res) => {
  const { id_estudiante } = req.params;
  const {
    nombre,
    apellido,
    DNI,
    direccion_calle,
    calle_numero,
    telefono,
    email,  // Corrección: usar 'email' en lugar de 'emailCREATE'
    grupo_sanguineo,
    fecha_nacimiento,
    cuil,
    id_provincia,
    id_localidad,
    id_curso,
    estado,
  } = req.body;

  try {
    // Verificar si el estudiante existe
    const estudiante = await EstudianteModel.findByPk(id_estudiante);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Actualizar el estudiante
    const estudianteActualizado = await EstudianteModel.update(
      {
        nombre,
        apellido,
        DNI,
        direccion_calle,
        calle_numero,
        telefono,
        email,  // Corrección aquí
        grupo_sanguineo,
        fecha_nacimiento,
        cuil,
        id_provincia,
        id_localidad,
        id_curso,
        estado,
      },
      { where: { id_estudiante } }
    );

    if (estudianteActualizado[0] === 1) {
      const estudianteRecienActualizado = await EstudianteModel.findByPk(id_estudiante); // Opcional
      res.status(200).json(estudianteRecienActualizado);  // Devolver el estudiante actualizado
    } else {
      res.status(200).json({ message: "No se realizaron cambios en el estudiante" });
    }
  } catch (error) {
    console.error("Error al actualizar el estudiante:", error);
    res.status(500).json({ error: "Error al actualizar el estudiante" });
  }
};


// Eliminar un estudiante (borrado lógico)
const eliminarEstudiante = async (req, res) => {
  const { id_estudiante } = req.params;
  try {
    const estudianteActualizado = await EstudianteModel.update(
      { estado: "inactivo" }, // Cambiar estado a 'inactivo'
      { where: { id_estudiante } }
    );
    if (estudianteActualizado[0] === 1) {
      res
        .status(200)
        .json({ message: "Estudiante marcado como inactivo correctamente" });
    } else {
      res.status(404).json({ error: "Estudiante no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error);
    res.status(500).json({ error: "Error al eliminar el estudiante" });
  }
};

module.exports = {
  obtenerTodosEstudiantes,
  crearEstudiante,
  obtenerEstudiantes,
  actualizarEstudiante,
  eliminarEstudiante,
};
