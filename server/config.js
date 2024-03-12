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
        user: 'postgres',
        host: 'roundhouse.proxy.rlwy.net',
        database: 'CHUPITOS_DB',
        password: 'ZdoWGkZBcCjmgjozEcwckEtMGoMQqehQ',
        port: '56773', // Por defecto es 5432
    });

    con.connect();
    module.exports = con;

} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}






