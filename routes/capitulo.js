const {Router}=require('express');
const { check } = require("express-validator");
const { crearCapitulo, obtenerCapitulos, actualizarCapitulo, eliminarCapitulo } = require('../controller/Capitulo');
const { validarCampos } = require('../middlewares');
const router=Router();
router.post('/',[ check("nombre", "El titulo es obligatorio").not().isEmpty(),
validarCampos],crearCapitulo)
router.get('/',obtenerCapitulos);
router.put('/:id',[check("id", "El id no es valido").isMongoId(),validarCampos],actualizarCapitulo);
router.delete('/:id',[check("id", "El id no es valido").isMongoId(),validarCampos],eliminarCapitulo);
module.exports=router;
