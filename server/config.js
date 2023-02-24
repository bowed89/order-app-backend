const { Client } = require('pg');

//Conexion con BD de HEROKU
/* const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}); */

// Conexion BD RAILWAY
/* const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}); 

con.connect();




//Conexion con BD LOCAL
const con = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'CHUPITOS_DB',
    password: 'root',
    port: 5432,
});

//con.connect(); 
*/


const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    try {
        await con.connect();
        console.log('connected');
    } catch (e) {
        console.log('Error happend while connecting to the DB: ', e.message)
    }
})();

module.exports = con; 