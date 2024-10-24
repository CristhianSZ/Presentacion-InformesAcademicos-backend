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

const getProvinciasYLocalidades = async (req, res) => {
  try {
    // Obtener todas las provincias
    const provincias = await ProvinciaModel.findAll({
      attributes: ['id_provincia', 'nombre'], // Solo traer el id y nombre de la provincia
    });

    // Obtener todas las localidades junto con sus provincias
    const localidades = await LocalidadModel.findAll({
      attributes: ['id_localidad', 'nombre', 'id_provincia'], // Solo traer los atributos necesarios
    });

    // Enviar provincias y localidades como dos conjuntos de datos separados
    res.json({ provincias, localidades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener provincias y localidades.' });
  }
};


module.exports = { getLocalidades ,getProvinciasYLocalidades};
