const { Router } = require("express");
const { check } = require("express-validator");
const { enviarCorreo } = require("../controller/Correo");
const { validarCampos } = require("../middlewares");
const router = Router();

router.post("/", [
  check("correo", "El correo es obligatorio").not().isEmpty(),
  check("correo", "El correo es invalido").isEmail(),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("mensaje", "El mensaje es obligatorio").not().isEmpty(),
  validarCampos,
],enviarCorreo);

module.exports = router;
