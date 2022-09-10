const { Router } = require('express');
const { getListasPorTenant, postLista, updateLista, deleteLista } = require('../controllers/listas');


const router = Router();


router.get('/:tenantid', getListasPorTenant);
router.post('/', postLista);
router.put('/:id', updateLista);
router.delete('/:activeList', deleteLista);


module.exports = router