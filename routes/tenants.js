const { Router } = require('express');
const { check } = require('express-validator');
const { tenantsGet,
        tenantsPost,
        tenantsPut,
        getTenantById} = require('../controllers/tenants');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', [
    validarJWT,
], tenantsGet)
router.get('/:tenantid', getTenantById)
router.post('/', [
    check('data.usuario', 'No es un email válido').isEmail(),
    check('data.plan', 'No es un plan válido').isIn(['trial', 'personal', 'pro', 'business']),
    validarCampos
], tenantsPost)
router.put('/:tenantid', tenantsPut)


module.exports = router