const { response } = require("express");
const { dbSchema, pool } = require("../database/config");




const getHistorialPorTenant = (req, res = response) => {
    const { tenantid } = req.params;

    const sql = `SELECT * FROM ${dbSchema}.historial WHERE tenantid=$1`
    pool.query(sql, [tenantid], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.status(200).json({ ok: true, cantidad: data.rows.length, data: data.rows })
        }
    })
}



const getHistorialPorPeriodo = (req, res = response) => {
    const { tenantid } = req.params;
    const estado = 'true';

    const sql = `SELECT COUNT(*)
                    FROM ${dbSchema}.historial
                    WHERE fechacreacion >= (
                        SELECT MAX(SS.INICIO_PERIODO) FROM (
                            SELECT GENERATE_SERIES( fechaalta, CURRENT_TIMESTAMP, '1 month' ) AS INICIO_PERIODO
                                FROM ${dbSchema}.tenants
                                WHERE tenantid = $1)
                        SS)
                    AND tenantid = $1
                    AND estado = $2;`
    pool.query(sql, [tenantid, estado], (error, data) => {
        if(error){
            console.log(error);
            return res.status(500).json({ ok: false, msg: error.message })
        } else {
            return res.json({ ok: true, data: data.rows[0].count })
        }
    })
}




module.exports = {
    getHistorialPorTenant,
    getHistorialPorPeriodo
}