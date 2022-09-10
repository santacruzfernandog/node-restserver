const { Router } = require('express');
const { getSchedulesPorTenant, getSchedulesEjecutadosPorTenant } = require('../controllers/schedules');


const router = Router();



router.get('/:tenantid', getSchedulesPorTenant);
router.get('/ejecutados/:tenantid', getSchedulesEjecutadosPorTenant);



module.exports = router