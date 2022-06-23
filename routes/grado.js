const { Router } = require("express");
const { agregarGrado, obtenerGrados } = require("../controller/Grado");
const { validarGrado } = require('../middlewares/validarGrado');
const router = Router();




router.post('/agregar',[
    validarGrado
],agregarGrado);
router.get('/',obtenerGrados);

module.exports = router;