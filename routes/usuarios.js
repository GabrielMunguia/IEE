const {Router}= require('express')
const { check } = require("express-validator");

const { actualizarUsuario, login } = require('../controller/usuario');

const { validarCampos } = require("../middlewares");
const { validarJWT } = require('../middlewares/validar-JWT');

const router= Router();

//Obtener la presentacion

router.post('/login',[
    check('correo', 'El correo es obligatorio!').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
],login
)

router.put('/login',[
    validarJWT,
    check('password', 'El password actual es obligatorio').notEmpty(),
    validarCampos
],actualizarUsuario
)



module.exports=router;

