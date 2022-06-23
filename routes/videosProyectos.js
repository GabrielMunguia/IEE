const { Router } = require("express");
const { check } = require("express-validator");
const {
  agregarVideoProyecto,
  obtenerVideosPorProyecto,
  eliminarVideo,
} = require("../controller/proyectoVideos");
const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarProyecto } = require("../middlewares/validarProyecto");

const router = Router();

//Agregar una imagen a un proyecto

router.post(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("video", "El video es obligatorio").not().isEmpty(),
    validarCampos,
    validarProyecto,
  ],
  agregarVideoProyecto
);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    validarCampos,
    validarProyecto,
  ],
  obtenerVideosPorProyecto
);

router.delete(
  "/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],
  eliminarVideo
);

module.exports = router;
