const { Router } = require('express');
const { getHistorialPorTenant, getHistorialPorPeriodo } = require('../controllers/historial');


const router = Router();


router.get('/:tenantid', getHistorialPorTenant);
router.get('/fromdate/:tenantid', getHistorialPorPeriodo);


module.exports = router