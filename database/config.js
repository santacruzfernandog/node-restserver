const { Pool } = require('pg');
const dbSchema = process.env.PGSCHEMA


// Creación Base de datos
const pool = new Pool();


module.exports = {
    pool,
    dbSchema
}
