const express = require('express');
const router = express.Router();
const con = require('../server/config');

const { verificaToken } = require('../middleware/verificaToken');

router.get('/', verificaToken, async (req, res) => {
    try {
        const response = await con.query(`SELECT a.nombre as nom_cat, b.nombre as nom_prod, b.precio, b.id_producto
                                        FROM categoria_producto a, producto b
                                        WHERE a.id_cat_prod = b.id_cat_prod`);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post('/find', async (req, res) => {
    try {
        const response = await con.query(`
                                        SELECT a.nombre, a.precio, a.id_cat_prod, b.nombre AS nombrecat
                                        FROM  producto a, categoria_producto b
                                        WHERE a.id_cat_prod = b.id_cat_prod
                                        AND id_producto=${req.body.id}`);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.get('/list', async (req, res) => {
    try {
        const response = await con.query(`SELECT * FROM producto`);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// BORRAR
router.post('/delete', async (req, res) => {
    try {
        const response = await con.query(`DELETE FROM producto WHERE id_producto=${req.body.id_producto}`);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// REGISTRAR NUEVO PRODUCTO
router.post('/new', async (req, res) => {
    try {
        const { nombre, precio, id_cat_prod } = req.body;
        if (!nombre || !precio || precio === 0 || !id_cat_prod) {
            res.status(400).json({ success: false, error: "Invalid input data" });
            return;
        }
        const query = {
            text: 'INSERT INTO producto(id_cat_prod, nombre, precio, created_on) VALUES($1, $2, $3, current_timestamp) RETURNING *',
            values: [id_cat_prod, nombre, precio]
        };
        const response = await con.query(query);
        res.status(200).json({ res: response.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// EDITAR PRODUCTO
router.put('/update', async (req, res) => {
    try {
        const { id_producto, nombre, precio, id_cat_prod } = req.body;
        if (!id_producto || !nombre || !precio || precio === 0 || !id_cat_prod) {
            res.status(400).json({ success: false, error: "Invalid input data" });
            return;
        }
        const query = {
            text: `UPDATE producto SET  id_cat_prod=$1, nombre=$2, precio=$3
               WHERE id_producto=${id_producto} RETURNING *`,
            values: [id_cat_prod, nombre, precio]
        };
        const response = await con.query(query);
        res.status(200).json({ datos: response.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;

/* const express = require('express');
const router = express.Router();
const con = require('../server/config');

const { verificaToken } = require('../middleware/verificaToken');

router.get('/', verificaToken, async (req, res) => {
    const response = await con.query(`SELECT a.nombre as nom_cat, b.nombre as nom_prod, b.precio, b.id_producto
                                        FROM categoria_producto a, producto b
                                        WHERE a.id_cat_prod = b.id_cat_prod`
    );
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

router.post('/find', async (req, res) => {
    const response = await con.query(`
                                        SELECT a.nombre, a.precio, a.id_cat_prod, b.nombre AS nombrecat
                                        FROM  producto a, categoria_producto b
                                        WHERE a.id_cat_prod = b.id_cat_prod
                                        AND id_producto=${req.body.id}`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

router.get('/list', async (req, res) => {
    const response = await con.query(`SELECT * FROM producto`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// BORRAR
router.post('/delete', async (req, res) => {
    console.log(req.body.id_producto);
    const response = await con.query(`DELETE FROM producto WHERE id_producto=${req.body.id_producto}`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// REGISTRAR NUEVO PRODUCTO
router.post('/new', async (req, res) => {
    if (req.body.nombre == null || req.body.nombre == '' || req.body.precio == 0 || req.body.precio == '' || req.body.id_cat_prod == '' || req.body.id_cat_prod == undefined) {
        res.status(400).json({ success: false })
        return 0;
    }
    var params = req.body;
    const query = {
        text: 'INSERT INTO producto(id_cat_prod, nombre, precio, created_on) VALUES($1, $2, $3, current_timestamp) RETURNING *',
        values: [params.id_cat_prod, params.nombre, params.precio]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});

// EDITAR PRODUCTO
router.put('/update', async (req, res) => {
    console.log(req.body.nombre);
    console.log(req.body.id_cat_prod);
    console.log(req.body.precio);

    if (req.body.nombre == null || req.body.nombre == '' || req.body.precio == 0 || req.body.precio == '') {
        res.status(400).json({ success: false })
        return 0;
    }
    var params = req.body;
    const query = {
        text: `UPDATE producto SET  id_cat_prod=$1, nombre=$2, precio=$3
               WHERE id_producto=${params.id_producto} RETURNING *`,
        values: [
            params.id_cat_prod,
            params.nombre,
            params.precio
        ]
    }
    await con.query(query).then((result) =>
        res.status(200).json({
            datos: result.rows[0],
        })
    ).catch((e) => console.error(e.stack));
})


module.exports = router; */