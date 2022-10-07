const { Router } = require('express');
const { reporteGeneral } = require('../controller/Reportes');

const router = Router();

router.get('/', reporteGeneral);
module.exports = router;
