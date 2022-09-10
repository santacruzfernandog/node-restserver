const { response } = require("express");
const { dbSchema, pool } = require("../database/config");




const getSchedulesPorTenant = (req, res = response) => {
    const { tenantid } = req.params;

    const sql = `SELECT * FROM ${dbSchema}.schedule WHERE tenantid = $1`
    pool.query(sql, [tenantid], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, data: data.rows })
        }
    })
}


const getSchedulesEjecutadosPorTenant = (req, res = response) => {
    const { tenantid } = req.params;

    const sql = `SELECT * FROM ${dbSchema}.tareasejecutadas WHERE tenantid = $1`
    pool.query(sql, [tenantid], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, data: data.rows })
        }
    })
}




module.exports = {
    getSchedulesPorTenant,
    getSchedulesEjecutadosPorTenant
}