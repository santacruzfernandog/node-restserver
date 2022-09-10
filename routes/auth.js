const { Router } = require('express');
const { generarToken, renovarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', generarToken);
router.get('/renew', validarJWT, renovarToken);


module.exports = router