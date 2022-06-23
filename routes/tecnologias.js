const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearTecnologia,
  actualizarTecnologia,
  eliminarTecnologia,
  obtenerTecnologias,
  eliminarImagenTecnologia,
  obtenerTecnologia,
} = require("../controller/tecnologia");
const { existeTecnologia } = require("../helpers/validacionesDB");

const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.get("/", obtenerTecnologias);

router.get(
  "/:id",
  [check("id", "El id no es valido").isMongoId(), validarCampos],
  obtenerTecnologia
);

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("titulo").custom(existeTecnologia),
    validarCampos,
  ],
  crearTecnologia
);

router.put(
  "/:id",
  [
    validarJWT,
    check("titulo").custom(existeTecnologia),
    check("id", "El id no es valido").isMongoId(),
    validarCampos,
  ],

  actualizarTecnologia
);

router.delete(
  "/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],

  eliminarTecnologia
);

router.delete(
  "/img/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],

  eliminarImagenTecnologia
);

module.exports = router;
