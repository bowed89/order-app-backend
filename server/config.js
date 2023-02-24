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
    user: 'qikytpyukyaxtx',
    host: 'ec2-34-199-68-114.compute-1.amazonaws.com',
    database: 'd3ctrjqk22uavb',
    password: '79051d1d17607a9702f4ad6dafcadaefe3609b59b26a5eb0b2b3449b6ad16c12',
    port: 5432,
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