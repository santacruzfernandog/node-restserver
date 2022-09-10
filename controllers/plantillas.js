const { response } = require('express');
const { dbSchema, pool } = require('../database/config');
const format = require('pg-format');
const PlantillaSchema = require('../models/plantilla');



const getPlantillasPorTenant = (req, res = response) => {
    const { tenantid } = req.params;

    const sql = `SELECT * FROM ${dbSchema}.plantillas WHERE tenantid=$1 ORDER BY idmensajegenerico DESC`
    pool.query(sql, [tenantid], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, data: data.rows })
        }
    })
}


const postPlantillas = (req, res = response) => {
    const { data } = req.body;
    // Esta constante será un array de arrays
    const dataToSave = []

    for(const num in data){
        const plantilla = new PlantillaSchema(data[num])
        const arrayPlantilla = plantilla.toArray()
        dataToSave.push(arrayPlantilla)
    }

    // Guardado en DB
    const sql = format(`INSERT INTO ${dbSchema}.plantillas(nombreplantilla, mensajegenerico, fechacreacion, usuario, tenantid) VALUES %L`, dataToSave);
        
    pool.query(sql, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: '¡Plantilla guardada!' })
        }
    });
}


const updatePlantilla = (req, res = response) => {
    const { id } = req.params;
    const { data } = req.body;

    const plantilla = new PlantillaSchema(data)
    const arrayPlantilla = plantilla.toArray()

    const sql = `UPDATE ${dbSchema}.plantillas SET nombreplantilla=$1, mensajegenerico=$2, fechamodificacion=$3, usuario=$4, tenantid=$5 WHERE idmensajegenerico=$6`
    pool.query(sql, [...arrayPlantilla, id], (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Plantilla actualizada' })
        }
    })
}


const deletePlantillaPorId = (req, res = response) => {
    const { id } = req.params;

    const sql = `DELETE FROM ${dbSchema}.plantillas WHERE idmensajegenerico = $1`
    pool.query(sql, [id], error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.json({ ok: true, msg: 'Plantilla eliminada' })
        }
    })
}


const deletePlantillasDeTenant = (req, res = response) => {
    const { tenantid } = req.params;

    const sql = `DELETE FROM ${dbSchema}.plantillas WHERE tenantid = $1`
    pool.query(sql, [tenantid], error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Plantillas eliminadas' })
        }
    })
}





module.exports = {
    getPlantillasPorTenant,
    postPlantillas,
    updatePlantilla,
    deletePlantillaPorId,
    deletePlantillasDeTenant
}