const { Router } = require('express');
const { getConfiguracion, postConfiguracion, updateConfiguracion } = require('../controllers/configuraciones');



const router = Router();


router.get('/:email', getConfiguracion);
router.post('/', postConfiguracion);
router.put('/', updateConfiguracion);



module.exports = router