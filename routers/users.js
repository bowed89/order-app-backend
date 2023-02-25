const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const con = require('../server/config');
const { generarJWT } = require('../helpers/generarJWT.js');
const jwt = require('jsonwebtoken');

require('dotenv/config');

router.get('/', async (req, res) => {
    const response = await con.query(`SELECT * FROM usuario`);
    if (!response) {
        res.status(500).json({ success: false })
    }
    res.send(response.rows)
});

// REGISTRAR NUEVO USUARIO
router.post('/signup', async (req, res) => {
    var params = req.body;
    const query = {
        text: 'INSERT INTO usuario(nombre, apellido, rol, login, password, created_on) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *',
        values: [params.nombre, params.apellido, params.rol, params.login, bcrypt.hashSync(params.password, 10)]
    }
    await con.query(query)
        .then(result =>
            res.status(200).json({ res: result.rows[0] }
            )).catch(e => console.error(e.stack))
});


//LOGIN
router.post('/signin', async (req, res) => {
    if (!req.body.login || !req.body.password) return res.status(400).json({ msg: 'Por favor introduzca el Usuario y/o Contraseña' })
    const query = {
        text: 'SELECT * FROM usuario WHERE login=$1',
        values: [req.body.login],
    }
    await con.query(query, (err, result) => {
        if (err) throw err
        if (result.rowCount == 0) return res.status(400).json({ msg: 'Usuario no válido' })
        if (!bcrypt.compareSync(req.body.password, result.rows[0].password)) {
            return res.status(400).json({ msg: 'Contraseña no válida' })
        }
        let generador = result.rows[0];
        delete generador.password;

        return res.status(200).json({
            res: generador,
            token: generarJWT(generador)
        })
    })
});

// VERIFICAR TOKEN
router.get('/renew', (req, res) => {
    const { token } = req.headers; // agarra el token del header
    let payload;

    if (token) {
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET); //decodifica el token
            return res.status(200).json({
                login: payload.generador.login,
                token
            })
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error" })
        }
    }

    if (!payload) {
        const error = new Error("Token no válido!")
        return res.status(401).json({ msg: error.message })
    }





});



module.exports = router;