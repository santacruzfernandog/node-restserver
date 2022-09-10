const { Router } = require('express');
const {
    getPlantillasPorTenant,
    postPlantillas,
    updatePlantilla,
    deletePlantillaPorId,
    deletePlantillasDeTenant } = require('../controllers/plantillas');


const router = Router();


router.get('/:tenantid', getPlantillasPorTenant);
router.post('/', postPlantillas);
router.put('/:id', updatePlantilla);
router.delete('/:id', deletePlantillaPorId);
router.delete('/todas/:tenantid', deletePlantillasDeTenant);



module.exports = router