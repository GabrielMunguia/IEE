const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerSecciones,
  crearSeccion,
  actualizarSeccion,
  eliminarSeccion,
  obtenerSeccion,
} = require("../controller/secciones");
const { existeSeccion } = require("../helpers/validacionesDB");
const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

//Obtener todas las secciones

router.get("/", obtenerSecciones);

router.get(
    "/:id",
  [check("id", "El id no es valido").isMongoId(), validarCampos],
  obtenerSeccion
);

//Crear seccion

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("nombre").custom(existeSeccion),
    validarCampos,
  ],
  crearSeccion
);

//Actualizar Secciones

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("nombre").custom(existeSeccion),
    validarCampos,
  ],
  actualizarSeccion
);

router.delete(
  "/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],
  eliminarSeccion
);

module.exports = router;
