const jwt = require('jsonwebtoken');

const generarJWT = (generador) => {
    return jwt.sign({ generador }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {
    generarJWT
}
