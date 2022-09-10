const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {

    const token = req.header('hbg-token');
    if( !token ){
        return res.status(401).json({
            msg: 'Usuario no autorizado | No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.HBG_SECRET_KEY );
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Usuario no autorizado | Token no válido'
        })
    }
}




module.exports = { validarJWT }