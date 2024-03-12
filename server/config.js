const { Client } = require('pg');

// Conexion BD RAILWAY
const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
con.connect();

//Conexion con BD LOCAL
/* const con = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'CHUPITOS_DB',
    password: 'root',
    port: 5432,
});

con.connect();  */


module.exports = con; 