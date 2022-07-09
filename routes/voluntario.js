const {Router} = require("express")
const router = Router();
const { check } = require("express-validator");
const { crearVoluntario, getVoluntarios, actualizarVoluntario, eliminarVoluntario, getVoluntarioById } = require("../controller/Voluntario");
const { validarCampos } = require("../middlewares");
const { capituloValido } = require("../middlewares/capituloValido");
const { gradoValido } = require("../middlewares/gradoValido");
const { validarJWT } = require("../middlewares/validar-JWT");
const { validarCorreo } = require("../middlewares/validarCorreo");
const { validarNoMiembro } = require("../middlewares/validarNoMiembro");
const { validarTelefono } = require("../middlewares/validarTelefono");
console.clear()

router.post('/',[
    validarJWT,
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "El correo es obligatorio").not().isEmpty(),
    check("genero", "El genero es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("grado", "El grado no es un id valido").isMongoId(),
    check("capitulo", "El capitulo es obligatorio").not().isEmpty(),
    check("capitulo", "El capitulo no es un id valido").isMongoId(),
    check("noMiembro", "El numero de miembro es obligatorio").not().isEmpty(),
    check('correo', 'El correo es obligatorio!!!').not().isEmpty(),
    check('correo', 'El correo es invalido').isEmail(),
    validarCampos,
    capituloValido,
    validarCorreo,
    gradoValido,
    validarTelefono,
    validarNoMiembro,
],crearVoluntario)
router.get('/',getVoluntarios)
router.get('/:id',getVoluntarioById)
router.put('/:id',[validarJWT],actualizarVoluntario)
router.delete('/:id',[validarJWT],eliminarVoluntario);


module.exports = router;
