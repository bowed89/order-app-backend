const express = require('express');
const router = express.Router();
const con = require('../server/config');

router.get('/', async (req, res) => {
    const response = await con.query(`SELECT * FROM cliente`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// REGISTRAR NUEVO USUARIO
router.post('/new', async (req, res) => {
    var params = req.body;
    const query = {
        text: 'INSERT INTO cliente(nombre, apellido, cedula_identidad, telefono, email, direccion, created_on) VALUES($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING *',
        values: [params.nombre, params.apellido, params.cedula_identidad, params.telefono, params.email, params.direccion]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

module.exports = router;