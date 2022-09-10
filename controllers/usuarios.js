const { response } = require("express");
const { dbSchema, pool } = require("../database/config");
const UsuarioSchema = require("../models/usuario");




const postUsuario = (req, res = response) => {
    const { data } = req.body;
    const usuario = new UsuarioSchema(data)
    const arrayUsuario = usuario.toArray()

    const sql = `INSERT INTO ${dbSchema}.usuarios(mail, nombre, fechaalta, apellido, empresa, telefono, pais, terminosaceptados) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
    
    pool.query(sql, arrayUsuario, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Usuario guardado' })
        }
    });
}




module.exports = {
    postUsuario
}