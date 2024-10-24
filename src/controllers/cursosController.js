const { CursoModel } = require('../models/Cursos');

const obtenerCursos = async (req, res) => {
  try {
    const cursos = await CursoModel.findAll({
      attributes: ['id_curso', 'nombre', 'id_nivel'], // Asegúrate de incluir los campos correctos
    });
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { obtenerCursos };
