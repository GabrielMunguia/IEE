const {Router}= require("express");
const { check } = require("express-validator");
const { crearCaracteristica, obtenerCaracteristicas, actualizarCaracteristica, eliminarCaracteristica, obtenerCaracteristica, eliminarImagenCaracteristica } = require("../controller/Caracteristicas");
const { existeCaracteristica } = require("../helpers/validacionesDB");
const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-JWT");

const router= Router();

router.get('/',obtenerCaracteristicas)
router.get('/:id',
[
  check('id','El id no es valido').isMongoId(),
  validarCampos
]

,obtenerCaracteristica)

router.post('/',[
    validarJWT,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('titulo').custom(existeCaracteristica),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],
crearCaracteristica)

router.put('/:id',
[
  validarJWT,
  check('titulo').custom(existeCaracteristica),
  check('id','El id no es valido').isMongoId(),
  validarCampos
]

,actualizarCaracteristica)


router.delete('/:id',
[
  validarJWT,
  check('id','El id no es valido').isMongoId(),
  validarCampos
]

,eliminarCaracteristica)

router.delete('/img/:id',
[
  validarJWT,
  check('id','El id no es valido').isMongoId(),
  validarCampos
]

,eliminarImagenCaracteristica)





module.exports=router;