const { PersonalModel } = require("../models/Personal");

// Crear un nuevo Personal
const crearPersonal = async (req, res) => {
  const { nombre, apellido, DNI, direccion_calle, calle_numero, telefono, email, grupo_sanguineo, fecha_nacimiento, cuil, id_provincia, id_localidad, id_cargo, estado } = req.body;
  try {
    const crearPersonal = await PersonalModel.create({
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
      id_cargo,
      estado: estado || 'activo',  // Asignar estado por defecto a 'activo'
    });
    res.status(201).json(nuevoPersonal);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Personal" });
  }
};

// Obtener todos el Personals
const obtenerPersonal = async (req, res) => {
  try {
    const Personals = await PersonalModel.findAll({
      where: { estado: 'activo' } // Solo obtener Personal activos
    });
    res.json(Personals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los Personals" });
  }
};

// Actualizar un Personal
const actualizarPersonal = async (req, res) => {
  const { id_Personal } = req.params;
  const {
    nombre,
    apellido,
    DNI,
    direccion_calle,
    calle_numero,
    telefono,
    emailCREATE,
    grupo_sanguineo,
    fecha_nacimiento,
    cuil,
    id_provincia,
    id_localidad,
    id_cargo,
    estado 
  } = req.body;

  try {
    const PersonalActualizado = await PersonalModel.update(
      {
        nombre,
        apellido,
        DNI,
        direccion_calle,
        calle_numero,
        telefono,
        emailCREATE,
        grupo_sanguineo,
        fecha_nacimiento,
        cuil,
        id_provincia,
        id_localidad,
        id_cargo,
        estado
      },
      { where: { id_Personal } }
    );

    if (PersonalActualizado[0] === 1) {
      res.status(200).json({ message: "Personal actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Personal no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el Personal:", error);
    res.status(500).json({ error: "Error al actualizar el Personal" });
  }
};


// Eliminar un Personal (borrado lógico)
const eliminarPersonal = async (req, res) => {
  const { id_Personal } = req.params;
  try {
    const PersonalActualizado = await PersonalModel.update(
      { estado: 'inactivo' }, // Cambiar estado a 'inactivo'
      { where: { id_Personal } }
    );
    if (PersonalActualizado[0] === 1) {
      res.status(200).json({ message: "Personal marcado como inactivo correctamente" });
    } else {
      res.status(404).json({ error: "Personal no encontrado" });
    }
  } catch (error) {
    console.error('Error al eliminar el Personal:', error);
    res.status(500).json({ error: "Error al eliminar el Personal" });
  }
};

module.exports = { crearPersonal, obtenerPersonal, actualizarPersonal, eliminarPersonal };
