const express = require('express');
const router = express.Router();
const { getLocalidades,getProvinciasYLocalidades } = require('../controllers/localidadController');

// Ruta para obtener localidades con provincias
router.get('/', getLocalidades);
router.get('/getProvinciasYLocalidades', getProvinciasYLocalidades);

module.exports = router;
