const { response } = require('express');
const { dbSchema, pool } = require('../database/config');
const format = require('pg-format');
const ContactoSchema = require('../models/contacto');




const getContactos = (req, res = response) => {
    const sql = `SELECT * FROM ${dbSchema}.contactos ORDER BY idcontacto`
    pool.query(sql, (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, data: data.rows })
        }
    })
}


const getContactosPorLista = (req, res = response) => {
    const { activeList } = req.params;
    const sql = `SELECT * FROM ${dbSchema}.contactos WHERE idlista = $1 ORDER BY idcontacto`
    pool.query(sql, [activeList], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, data: data.rows })
        }
    })
}


const postContactos = (req, res = response) => {
    const { data } = req.body;
    // Esta constante será un array de arrays
    const dataToSave = []

    // Construcción de datos a guardar
    for(const num in data){
        const contacto = new ContactoSchema(data[num])
        const infoArray = contacto.toArrayWithoutId();
        dataToSave.push(infoArray)
    }

    // Grabado en BD
    const sql = format(`INSERT INTO ${dbSchema}.contactos(nombre, apellido, empresa, cargo, pais, numero, idlista, observaciones, fechacreacion, usuario, tenantid) VALUES %L`, dataToSave);

    pool.query(sql, error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Contactos guardados' })
        }
    })
}


const updateContactos = (req, res = response) => {
    const { data } = req.body;
    // Esta constante será un array de arrays
    const dataToSave = []

    for(let i = 0; i < data.length; i++){
        const contacto = new ContactoSchema(data[i])
        const infoArray = contacto.toArrayWithId();
        dataToSave.push(infoArray)
    }
    
    // Grabado en BD
    const sql = format(`INSERT INTO ${dbSchema}.contactos(
        idcontacto, nombre, apellido, empresa, cargo, pais, numero, idlista, observaciones, fechamodificacion)
        VALUES %L
            ON CONFLICT (idcontacto) DO UPDATE
            SET nombre = excluded.nombre,
                apellido = excluded.apellido,
                empresa = excluded.empresa,
                cargo = excluded.cargo,
                pais = excluded.pais,
                numero = excluded.numero,
                observaciones = excluded.observaciones,
                idlista = excluded.idlista,
                fechamodificacion = excluded.fechamodificacion`, dataToSave);
    
    pool.query(sql, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Contactos actualizados' })
        }
    })
}


const deleteContacto = (req, res = response) => {
    const { id } = req.params;

    const sql = `DELETE FROM ${dbSchema}.contactos WHERE idcontacto=$1`
    pool.query(sql, [id], error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Contacto eliminado' })
        }
    })
}


const deleteContactosDeLista = (req, res = response) => {
    const { activeList } = req.params;

    const sql = `DELETE FROM ${dbSchema}.contactos WHERE idlista = $1`
    pool.query(sql, [activeList], error => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, msg: 'Contactos eliminados' })
        }
    })
}




module.exports = {
    getContactos,
    getContactosPorLista,
    postContactos,
    updateContactos,
    deleteContacto,
    deleteContactosDeLista
}