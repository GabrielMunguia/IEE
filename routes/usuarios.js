const {Router}= require('express')
const { check } = require("express-validator");

const { actualizarUsuario, login, crearUsuario } = require('../controller/usuario');

const { validarCampos } = require("../middlewares");
const { validarJWT } = require('../middlewares/validar-JWT');

const router= Router();

//Obtener la presentacion

router.post('/login',[
    check('usuario', 'El usuario es obligatorio!').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
],login
)

router.put('/',[
    validarJWT,
    check('password', 'El password actual es obligatorio').notEmpty(),
    validarCampos
],actualizarUsuario
)

router.post('/',[
    validarJWT,
    check('password', 'El password actual es obligatorio').notEmpty(),
    check('usuario', 'El usuario es obligatorio').notEmpty(),
    check('voluntario', 'El voluntario es obligatorio').notEmpty(),
    validarCampos
],crearUsuario
)






module.exports=router;

