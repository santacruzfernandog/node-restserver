const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");


const generarToken = async(req, res = response) => {
    // Acá necesito recibir el tenant del usuario logueado en Harbinger, y setearlo como su UID
    const uid = 'thisismyUID'
    const token = await generarJWT( uid )
    res.status(200).json({ ok: true, token })
}


const renovarToken = async(req, res = response) => {
    const uid = req.uid;
    // Genera un nuevo JWT
    const token = await generarJWT( uid )

    res.json({
        ok: true,
        token
    })
}



module.exports = {
    generarToken,
    renovarToken
}