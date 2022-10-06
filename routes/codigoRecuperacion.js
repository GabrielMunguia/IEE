const Router= require('express').Router;
const router = Router();
const {generarCodigoRecuperacion, recuperarPassword}= require('../controller/CodigoRecuperacion');
router.post('/',generarCodigoRecuperacion);
router.post('/verificar',recuperarPassword);


module.exports=router;
