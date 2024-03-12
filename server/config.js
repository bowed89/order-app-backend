const { Client } = require('pg');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

//Conexion con BD LOCAL
/* const con = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'CHUPITOS_DB',
    password: 'root',
    port: 5432,
});

con.connect();  */

// Conexion BD RAILWAY
try {
    const con = new Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password:process.env.PASSWORD,
        port: process.env.PORT,
    });

    con.connect();
    module.exports = con;

} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}






