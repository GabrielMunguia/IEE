const {Router}= require('express')
const { check } = require("express-validator");
const { obtenerPresentacion, actualizarPresentacion } = require('../controller/presentacion');
const { validarCampos } = require("../middlewares");
const { validarJWT } = require('../middlewares/validar-JWT');

const router= Router();

//Obtener la presentacion

router.get('/',obtenerPresentacion)

//actualizar presentacion
router.put('/:id',[
    validarJWT,
    check('id','El id es requerido').not().isEmpty(),
    check('id','el id no es valido').isMongoId(),
    validarCampos
],actualizarPresentacion)


module.exports=router;