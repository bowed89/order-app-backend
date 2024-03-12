const jwt = require('jsonwebtoken');

//variable global 
require('dotenv/config');
const seed = process.env.JWT_SECRET;

const verificaToken = async (req, res, next) => {
    let token = req.header('token');
    console.log("token =>>>",token);

    if (!token) {
        return res.status(401).json({
            msg: '¡Token no válido!'
        })
    }
    try {
        await jwt.verify(token, seed);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: '¡Token no válido!'
        })
    }
};

module.exports = {
    verificaToken
}

