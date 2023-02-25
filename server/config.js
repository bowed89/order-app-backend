const { Client } = require('pg');

const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    try {
        await con.connect();
        console.log('connecteded');
    } catch (e) {
        console.log('Error happend while connecting to the DB: ', e.message)
    }
})();

module.exports = con; 