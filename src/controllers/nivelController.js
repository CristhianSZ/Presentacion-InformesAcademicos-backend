const { NivelModel } = require('../models/Nivel'); 

const obtenerNiveles = async (req, res) => {
  try {
    const niveles = await NivelModel.findAll({
      attributes: ['id_nivel', 'nombre'], 
    });
    res.status(200).json(niveles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  obtenerNiveles
};
