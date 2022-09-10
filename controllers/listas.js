const { response } = require('express');
const { dbSchema, pool } = require('../database/config');
const ListaSchema = require('../models/lista');



const getListasPorTenant = (req, res = response) => {
    const { tenantid } = req.params;
    
    const sql = `SELECT * FROM ${dbSchema}.listas WHERE tenantid = $1`
    pool.query(sql, [tenantid], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, data: data.rows })
        }
    })
}


const postLista = (req, res = response) => {
    const { data } = req.body;
    const nuevaLista = new ListaSchema(data)
    const arrayNuevaLista = nuevaLista.toArray()

    const sql = `INSERT INTO ${dbSchema}.listas(nombrelista, fechacreacion, usuario, tenantid) VALUES($1,$2,$3,$4)`;

    pool.query(sql, arrayNuevaLista, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Lista insertada' })
        }
    });
}


const updateLista = (req, res = response) => {
    const { id } = req.params;
    const { data } = req.body;
    const nuevaLista = new ListaSchema(data);
    const arrayNuevaLista = nuevaLista.toArray()

    const sql = `UPDATE ${dbSchema}.listas SET nombrelista=$1, fechamodificacion=$2, usuario=$3, tenantid=$4 WHERE idlista = $5`
    pool.query(sql, [...arrayNuevaLista, id], error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Lista actualizada' })
        }
    })
}


const deleteLista = (req, res = response) => {
    const { activeList } = req.params;
    
    const sql = `DELETE FROM ${dbSchema}.listas WHERE idlista = $1`
    pool.query(sql, [activeList], error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Lista eliminada' })
        }
    })
}





module.exports = {
    getListasPorTenant,
    postLista,
    updateLista,
    deleteLista
}