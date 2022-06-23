const { Router } = require("express");
const { check } = require("express-validator");
const {
  agregarImagenProyecto,
  obtenerImagenesPorProyecto,
  eliminarImagen,
} = require("../controller/proyectoImagene");
const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarArchivoSubir } = require("../middlewares/validarArchivoSubir");
const { validarProyecto } = require("../middlewares/validarProyecto");

const router = Router();

//Agregar una imagen a un proyecto

router.post(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    validarCampos,
    validarProyecto,
    validarArchivoSubir,
  ],
  agregarImagenProyecto
);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    validarCampos,
    validarProyecto,
  ],
  obtenerImagenesPorProyecto
);

router.delete(
  "/:id",
  [validarJWT, check("id", "El id no es valido").isMongoId(), validarCampos],
  eliminarImagen
);

module.exports = router;
