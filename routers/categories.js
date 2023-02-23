const express = require('express');
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

module.exports = router;