const {Router} = require("express")
const router = Router();
const { check } = require("express-validator");
const { crearVoluntario, getVoluntarios } = require("../controller/Voluntario");
const { validarCampos } = require("../middlewares");
const { capituloValido } = require("../middlewares/capituloValido");
const { gradoValido } = require("../middlewares/gradoValido");

router.post('/',[
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "El correo es obligatorio").not().isEmpty(),
    check("genero", "El genero es obligatorio").not().isEmpty(),
    check("grado", "El grado es obligatorio").not().isEmpty(),
    check("grado", "El grado no es un id valido").isMongoId(),
    check("capitulo", "El capitulo es obligatorio").not().isEmpty(),
    check("capitulo", "El capitulo no es un id valido").isMongoId(),
    check("noMiembro", "El numero de miembro es obligatorio").not().isEmpty(),
    validarCampos,
    capituloValido,
    gradoValido,
  

],crearVoluntario)

router.get('/',getVoluntarios)


module.exports = router;
