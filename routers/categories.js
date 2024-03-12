const express = require('express');
const router = express.Router();
const con = require('../server/config');

router.get('/', async (req, res) => {
    try {
        const response = await con.query(`SELECT * FROM categoria_producto`);

        if (!response) {
            return res.status(500).json({ success: false });
        }
        res.send(response.rows);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// REGISTRAR NUEVA ORDEN TOTAL
router.post('/newTotal', async (req, res) => {
    try {
        var params = req.body;
        const query = {
            text: 'INSERT INTO orden_total(id_usuario, id_cliente, cantidad, total_pagar, efectivo, cambio, created_on) VALUES($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING *',
            values: [params.id_usuario, params.id_cliente, params.cantidad, params.total_pagar, params.efectivo, params.cambio]
        };
        const result = await con.query(query);
        res.status(200).json({ res: result.rows[0] });
    } catch (error) {
        console.error('Error al registrar nueva orden total:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// REGISTRAR NUEVA ORDEN DETALLE
router.post('/newDetail', async (req, res) => {
    try {
        var params = req.body;
        const query = {
            text: 'INSERT INTO orden_detalle(id_orden_total, cantidad, nombre_producto, precio, total, created_on) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *',
            values: [params.id_orden_total, params.cantidad, params.nombre_producto, params.precio, params.total]
        };
        const result = await con.query(query);
        res.status(200).json({ res: result.rows[0] });
    } catch (error) {
        console.error('Error al registrar nueva orden detalle:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

module.exports = router;


/* const express = require('express');
const router = express.Router();
const con = require('../server/config');

router.get('/', async (req, res) => {
    const response = await con.query(`SELECT * FROM categoria_producto`
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// REGISTRAR NUEVA ORDEN TOTAL
router.post('/newTotal', async (req, res) => {
    var params = req.body;
    const query = {
        text: 'INSERT INTO orden_total(id_usuario, id_cliente, cantidad, total_pagar, efectivo, cambio, created_on) VALUES($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING *',
        values: [params.id_usuario, params.id_cliente, params.cantidad, params.total_pagar, params.efectivo, params.cambio]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

// REGISTRAR NUEVA ORDEN DETALLE
router.post('/newDetail', async (req, res) => {
    var params = req.body;
    const query = {
        text: 'INSERT INTO orden_detalle(id_orden_total, cantidad, nombre_producto, precio, total, created_on) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *',
        values: [params.id_orden_total, params.cantidad, params.nombre_producto, params.precio, params.total]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

module.exports = router; */