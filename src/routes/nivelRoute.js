const express = require("express");
const { obtenerNiveles } = require("../controllers/nivelController");
const router = express.Router();

router.get("/", obtenerNiveles);

module.exports = router;
