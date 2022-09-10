const { response } = require('express');
const { dbSchema, pool } = require('../database/config');
const { DateTime } = require('luxon');
const TenantSchema = require('../models/tenant');



const tenantsGet = (req, res = response) => {
    const uid = req.uid;
    const sql = `SELECT * FROM ${dbSchema}.tenants`
    pool.query(sql, (error, data) => {
        if(error){
            console.log(error.message);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, uid, data: data.rows })
        }
    })
}



const getTenantById = (req, res = response) => {
    const { tenantid } = req.params;
    const tenant = tenantid.toLowerCase();
    
    const sql = `SELECT * FROM ${dbSchema}.tenants WHERE tenantid = $1`
    pool.query(sql, [tenant], (error, data) => {
        if(error){
            console.log(error.message);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.json({ ok: true, data: data.rows })
        }
    })
}


const tenantsPost = async(req, res = response) => {

    const { data } = req.body;
    const tenant = new TenantSchema(data)
    const tenantArray = tenant.toArray()

    const sql = `INSERT INTO ${dbSchema}.tenants(tenantid, usuario, fechaalta, plan, pago, customerid, fechamodificacion, idsuscripcion, avisolegalaceptado) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    
    pool.query(sql, tenantArray, (error) => {
        if(error){
            console.log(error.message)
            res.status(500).json({ ok: false, msg: error.message })
        } else {
            res.status(200).json({ ok: true, msg: 'Registro insertado' })
        }
    });
}


const tenantsPut = (req, res = response) => {
    const { tenantid } = req.params;
    const { plan, pago, avisolegalaceptado } = req.body.data;
    const fechamodificacion = DateTime.now();

    if(avisolegalaceptado){
        const arrayToUpdate = [avisolegalaceptado, tenantid]

        const sql = `UPDATE ${dbSchema}.tenants SET avisolegalaceptado=$1 WHERE tenantid=$2`
        pool.query(sql, arrayToUpdate, (error) => {
            if(error){
                console.log(error.message);
                return res.status(500).json({ ok: false, msg: error.message })
            } else {
                return res.status(200).json({ ok: true, msg: 'Disclaimer aceptado' })
            }
        })
    } else {
        const arrayToUpdate = [plan, pago, fechamodificacion, tenantid]

        const sql = `UPDATE ${dbSchema}.tenants SET plan=$1, pago=$2, fechamodificacion=$3 WHERE tenantid=$4`
        pool.query(sql, arrayToUpdate, (error) => {
            if(error){
                console.log(error.message);
                return res.status(500).json({ ok: false, msg: error.message })
            } else {
                return res.status(200).json({ ok: true, msg: 'Plan actualizado' })
            }
        })
    }
}



module.exports = {
    tenantsGet,
    getTenantById,
    tenantsPost,
    tenantsPut
}