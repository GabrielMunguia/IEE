const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerInformacionPersonal,
  crearInformacionPersonal,
  actualizarInformacionPersonal,
  eliminarInformacionPersonal,
  eliminarImagenInformacionPersonal,
  obtenerInformacionPersonales,
} = require("../controller/informacionPersonal");

const { existeInformacionPersonal } = require("../helpers/validacionesDB");
const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.get("/", obtenerInformacionPersonal);
router.get(
  "/:id",
  [check("id", "El id no es valido").isMongoId(), validarCampos],
  obtenerInformacionPersonales
);


router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("titulo").custom(existeInformacionPersonal),
    check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearInformacionPersonal
);

router.put(
  "/:id",
  [
    validarJWT,
    check("titulo").custom(existeInformacionPersonal),
    check("id", "El id no es valido").isMongoId(),
    validarCampos,
  ],

  actualizarInformacionPersonal
);

router.delete(
  "/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],

  eliminarInformacionPersonal
);

router.delete(
  "/img/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],

  eliminarImagenInformacionPersonal
);

module.exports = router;
