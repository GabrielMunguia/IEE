const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProyecto,
  obtenerProyectos,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto,
} = require("../controller/proyectos");
const { existeProyecto } = require("../helpers/validacionesDB");
const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("titulo").custom(existeProyecto),
    check("subTitulo", "El sub titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("fecha", "La fecha es obligatroria").not().isEmpty(),
    validarCampos,
  ],
  crearProyecto
);

router.get("/", obtenerProyectos);

router.get(
  "/:id",
  [check("id", "El id no es valido").isMongoId(), validarCampos],
  obtenerProyecto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),

    check("titulo").custom(existeProyecto),
    validarCampos,
  ],
  actualizarProyecto
);

router.delete(
  "/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],
  eliminarProyecto
);

module.exports = router;
