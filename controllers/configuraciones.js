const { response } = require('express');
const { dbSchema, pool } = require('../database/config');
const ConfiguracionSchema = require('../models/configuracion');




const getConfiguracion = (req, res = response) => {
    const { email } = req.params;

    const sql = `SELECT * FROM ${dbSchema}.configuraciones WHERE mail = $1`
    pool.query(sql, [email], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.json({ ok: true, data: data.rows })
        }
    })
}


const postConfiguracion = (req, res = response) => {
    const { data } = req.body;
    const configuracion = new ConfiguracionSchema(data)
    const arrayConfiguracion = configuracion.toArray()

    const sql = `INSERT INTO ${dbSchema}.configuraciones(mail, configuracion, fechacreacion) VALUES($1,$2,$3)`;
    
    pool.query(sql, arrayConfiguracion, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Configuración de usuario guardada' })
        }
    });
}


const updateConfiguracion = (req, res = response) => {
    const { data } = req.body;
    const configuracion = new ConfiguracionSchema(data)
    const arrayConfiguracion = configuracion.arrayToUpdate()

    const sql = `UPDATE ${dbSchema}.configuraciones SET configuracion=$1, fechamodificacion=$2 WHERE mail=$3`
    pool.query(sql, arrayConfiguracion, (error) => {
        if(error){
            console.log(error)
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Configuración actualizada' })
        }
    })
}





module.exports = {
    getConfiguracion,
    postConfiguracion,
    updateConfiguracion
}