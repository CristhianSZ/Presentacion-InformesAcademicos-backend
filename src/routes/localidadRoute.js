const express = require('express');
const router = express.Router();
const { getLocalidades } = require('../controllers/localidadController');

// Ruta para obtener localidades con provincias
router.get('/', getLocalidades);

module.exports = router;