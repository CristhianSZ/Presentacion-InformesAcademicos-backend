const express = require("express")
const router = express.Router()

const {obtenerCursos} = require("../controllers/cursosController")

router.get("/", obtenerCursos)

module.exports = router;