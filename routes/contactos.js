const { Router } = require('express');
const { getContactos, getContactosPorLista, postContactos, updateContactos, deleteContacto, deleteContactosDeLista } = require('../controllers/contactos');


const router = Router();


router.get('/', getContactos);
router.get('/:activeList', getContactosPorLista);
router.post('/', postContactos);
router.put('/', updateContactos);
router.delete('/:id', deleteContacto);
router.delete('/lista/:activeList', deleteContactosDeLista);


module.exports = router