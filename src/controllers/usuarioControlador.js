const respuestasHttp = require('../utils/respuestasHttp');
const usuarioServicio = require('../services/usuarioServicio');
const { UsuarioCrearReqModel, UsuarioDatosResModel } = require('../models/UsuarioModelo');
const { ProductoDatosResModel } = require('../models/ProductoModelo');

const postUsuario = async (req, res) => {
    try {
        const usuario = await usuarioServicio.crearUsuario(new UsuarioCrearReqModel(req.body));
        res.status(201).json({ usuarioEntity: new UsuarioDatosResModel(usuario) });
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al crear el usuario', error: err.message });
    }
}

const getUsuario = async (req, res) => {
    try {
        if (!req.user.error) {
            const usuario = await usuarioServicio.leerUsuario(req.user.sub);
            res.status(200).json({ usuarioEntity: new UsuarioDatosResModel(usuario) });
        } else {
            res.status(401).json({ mensaje: 'No tienes permisos para hacer esta petición' });
        }
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al leer el usuario', error: err.message });
    }
}

const getMisProductos = async (req, res) => {

    try {
        if(!req.user.error) {
            const arrayProductos = await usuarioServicio.leerMisProductos(req.user.sub);
            const losProductos = arrayProductos.map(producto=> new ProductoDatosResModel(producto));
            res.status(200).json({ productoEntity: losProductos });
        } else {
            res.status(401).json({ mensaje: 'No tienes permisos para hacer esta petición' });
        }

    } catch (error) {
        res.status(400).json({ mensaje: 'Error al leer los productos del usuario', error: err.message });
    }
}

const postSignin = (req, res) => {
    if (!req.user.error) {
        respuestasHttp.signin(req, res, "", 200);
    } else {
        res.status(404).json({ mensaje: 'Credenciales incorrectas' });
    }
}

module.exports = { postUsuario, getUsuario, getMisProductos, postSignin }