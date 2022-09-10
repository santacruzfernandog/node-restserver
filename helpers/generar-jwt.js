const jwt = require('jsonwebtoken')


const generarJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid }

        jwt.sign( payload, process.env.HBG_SECRET_KEY, {
            expiresIn: '4h'
        }, ( error, token ) => {
            if(error){
                console.log(error);
                reject('No se ha podido generar el token')
            } else {
                resolve( token );
            }
        })
    })
}



module.exports = {
    generarJWT
}