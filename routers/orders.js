const express = require('express');
const router = express.Router();
const con = require('../server/config');

const { verificaToken } = require('../middleware/verificaToken');

// LISTAR ORDENES TOTALES SIN RESTRICCION
router.get('/all', verificaToken, async (req, res) => {
    const response = await con.query(`SELECT * FROM orden_total ORDER BY(id_orden_total) DESC`
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});


// LISTAR ORDENES POR RANGO DE UN DIA Y DIA SGTE
router.post('/', verificaToken, async (req, res) => {
    const response = await con.query(`SELECT * FROM orden_total WHERE date(created_on) BETWEEN '${req.body.fechaAntdia}' AND '${req.body.fechaActual}' ORDER BY(id_orden_total) DESC`
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
        text: 'INSERT INTO orden_total(id_usuario, id_cliente, cantidad, total_pagar, efectivo, cambio, nombre_cliente, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [params.id_usuario, params.id_cliente, params.cantidad, params.total_pagar, params.efectivo, params.cambio, params.nombre_cliente, params.created_on]
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
        text: 'INSERT INTO orden_detalle(id_orden_total, cantidad, nombre_producto, precio, total, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [params.id_orden_total, params.cantidad, params.nombre_producto, params.precio, params.total, params.created_on]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

// VER REPORTES POR DIA GLOBALIZADO
router.post('/day', async (req, res) => {
    const response = await con.query(`SELECT * FROM orden_total WHERE date(created_on)='${req.body.fechaActual}' ORDER BY(id_orden_total) DESC`
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});


// VER REPORTES POR MES GLOBALIZADO
router.post('/month', async (req, res) => {
    const response = await con.query(`  SELECT * FROM orden_total 
                                        WHERE EXTRACT(month from created_on)='${req.body.mes}'
                                        AND EXTRACT(year from created_on)='${req.body.anio}'
                                        ORDER BY(id_orden_total) DESC
                                    `
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// VER REPORTES POR AÑO GLOBALIZADO
router.post('/year', async (req, res) => {
    const response = await con.query(`  SELECT * FROM orden_total 
                                        WHERE EXTRACT(year from created_on)='${req.body.anio}'
                                        ORDER BY(id_orden_total) DESC
                                    `
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// VER REPORTES POR RANGO GLOBALIZADO
router.post('/range', async (req, res) => {
    const response = await con.query(`  SELECT * FROM orden_total 
                                        WHERE created_on 
                                        BETWEEN '${req.body.primero}'
                                        AND '${req.body.segundo}'
                                        ORDER BY(id_orden_total) DESC
                                    `
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// VER REPORTES POR DIA DESGLOSADO
router.post('/d-day', async (req, res) => {
    const response = await con.query(`SELECT * FROM orden_detalle WHERE date(created_on)='${req.body.fechaActual}' ORDER BY(id_orden_detalle) DESC`
    );
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// VER REPORTES POR MES DESGLOSADO
router.post('/d-month', async (req, res) => {
    const response = await con.query(`  SELECT * FROM orden_detalle 
                                        WHERE EXTRACT(month from created_on)='${req.body.mes}'
                                        AND EXTRACT(year from created_on)='${req.body.anio}'
                                        ORDER BY(id_orden_detalle) DESC
                                    `
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// VER REPORTES POR AÑO DESGLOSADO
router.post('/d-year', async (req, res) => {
    const response = await con.query(`  SELECT * FROM orden_detalle 
                                        WHERE EXTRACT(year from created_on)='${req.body.anio}'
                                        ORDER BY(id_orden_detalle) DESC
                                    `
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// VER REPORTES POR RANGO DESGLOSADO
router.post('/d-range', async (req, res) => {

    const response = await con.query(`  SELECT * FROM orden_detalle 
                                        WHERE created_on 
                                        BETWEEN '${req.body.primero}'
                                        AND '${req.body.segundo}'
                                        ORDER BY(id_orden_detalle) DESC
                                    `
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// **** MODIFICAR ORDENES *****
// OBTENER orden_total
router.post('/ordenTotal', async (req, res) => {
    const response = await con.query(`SELECT * FROM orden_total WHERE id_orden_total=${req.body.id}`
    );
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// OBTENER orden_detalle
router.post('/ordenDetalle', async (req, res) => {
    const response = await con.query(`SELECT * FROM orden_detalle WHERE id_orden_total=${req.body.id}`
    );
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// BORRAR orden_detalle
router.post('/delete', async (req, res) => {
    const response = await con.query(`DELETE FROM orden_detalle WHERE id_orden_detalle=${req.body.id}`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// BORRAR orden_total
router.post('/deleteOrdenTotal', async (req, res) => {
    const response = await con.query(`DELETE FROM orden_total WHERE id_orden_total=${req.body.id}`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

//ACTUALIZAR CAMPO TOTAL_PAGAR DE LA TABLA ORDEN_TOTAL
router.put('/updateTotPagar', async (req, res) => {
    console.log(req.body);

    const query = {
        text: `UPDATE orden_total SET total_pagar=$1, cantidad=$2, efectivo=$3, cambio=$4
                WHERE id_orden_total=${req.body.id} RETURNING *`,
        values: [req.body.total, req.body.cantidad, req.body.efectivo, req.body.cambio]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

//ACTUALIZAR CAMPO TOTAL_PAGAR, EFECTIVO, CAMBIO DE LA TABLA ORDEN_TOTAL
router.put('/updateTotPagar2', async (req, res) => {
    const query = {
        text: `UPDATE orden_total 
               SET total_pagar=$1, cantidad=$2, efectivo=$3, cambio=$4, nombre_cliente=$5
               WHERE id_orden_total=${req.body.id} RETURNING *`,
        values: [req.body.total, req.body.cantidad, req.body.efectivo, req.body.cambio, req.body.nombre]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

// OBTENER PRODUCTO POR NOMBRE
router.post('/obtenerProducto', async (req, res) => {
    const response = await con.query(`SELECT * FROM producto WHERE nombre='${req.body.nombreProd}'`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});


// OBTENER orden_detalle con producto y los une id_cat_prod
router.post('/ordenIdCatProd', async (req, res) => {
    let arr = {}
    let arr2 = []

    const response = await con.query(`SELECT * FROM orden_detalle WHERE id_orden_total=${req.body.id}`);
    arr = response.rows

    for (let i in arr) {
        const response = await con.query(`SELECT * FROM producto WHERE nombre='${arr[i].nombre_producto}'`);
        arr2.push(response.rows)
    }
    //unimos arr con el id_cat_prod del arr2
    for (let i in arr) {
        arr[i].id_cat_prod = arr2[i][0]['id_cat_prod'];
    }
    if (!arr) {
        res.status(500).json({ success: false })
    }
    res.send(arr)

});

// ACTUALIZAR CONSOLIDAR
router.put('/updateConsolidar', async (req, res) => {

    console.log(req.body.switch);
    const query = {
        text: `UPDATE consolidar 
               SET switch=$1, created_on=$2
               WHERE id_consolidar=1 RETURNING *`,
        values: [req.body.switch, req.body.created_on]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

// OBTENER CONSOLIDAR
router.get('/consolidar', async (req, res) => {
    const response = await con.query(`SELECT * FROM consolidar`
    );

    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

module.exports = router;