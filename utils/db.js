const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

const {
    DB_USER,
    DB_PASSWORD_FILE,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;


const password = readFileSync(DB_PASSWORD_FILE,'utf8');

const pool =
        mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: password,
        database: DB_NAME,
        port: DB_PORT,
        namedPlaceholders: true,
    })


module.exports = {
    pool,
}
