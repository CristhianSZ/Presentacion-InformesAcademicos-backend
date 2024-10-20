const { LocalidadModel } = require('../models/Localidad');
const { ProvinciaModel} = require ('../models/Provincia')
const getLocalidades = async (req, res) => {
  try {
    const localidades = await LocalidadModel.findAll({
      include: [{
        model: ProvinciaModel,
        as: 'provincia',
        attributes: ['id_provincia', 'nombre'], // Solo traer el id y nombre de la provincia
      }],
    });

    res.json(localidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las localidades.' });
  }
};

module.exports = { getLocalidades };
