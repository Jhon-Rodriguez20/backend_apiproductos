const localStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const usuarioServicio = require('../services/usuarioServicio');
const jwt = require('jsonwebtoken');
const variables = require('../utils/variables');
const constantesSeguridad = require('./constantesSeguridad');

const crearToken = (usuario) => {
    const payload = {
        sub: usuario.idUsuario,
        name: usuario.nombre,
        exp: new Date().getTime() + constantesSeguridad.FECHA_EXPIRACION
    }
    return jwt.sign(payload, variables.TOKEN_SECRETO);
}

const localEstrategia = new localStrategy({ usernameField: 'celular', passwordField: 'password' },
    
    async (celular, password, callback) => {

        try {
            const usuario = await usuarioServicio.leerUsuarioLogin(celular);
            const validarPassword = await bcrypt.compare(password, usuario.passwordEncp);

            if(!validarPassword) {
                callback(null, { error: "Contraseña incorrecta" })
            } else {
                const token = crearToken(usuario);
                callback(null, usuario, token);
            }
        } catch (err) {
            callback(null, { error: "No se encontró el usuario" })
        }
    }
)

module.exports = {localEstrategia}