const usuarioRepositorio = require('../db/repositorios/usuarioRepositorio');
const { UsuarioEntity } = require('../models/UsuarioModelo');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const crearUsuario = async (usuario) => {
    if(!usuario.nombre || !usuario.celular || !usuario.password) {
        throw new Error('Datos vacios o incorrectos')
    }

    const validarCelular = await usuarioRepositorio.buscarCelular(usuario.celular);
    if(validarCelular) throw new Error("El número de celular ya existe");
    
    usuario.idUsuario = uuidv4();
    usuario.passwordEncp = bcrypt.hashSync(usuario.password, 10);

    await usuarioRepositorio.crear(new UsuarioEntity(usuario));
    return await usuarioRepositorio.buscarUsuario(usuario.idUsuario);
}

const leerUsuario = async (idUsuario) => {
    return await usuarioRepositorio.leer(idUsuario);
}

const leerMisProductos = async (idUsuario) => {
    const usuario = await usuarioRepositorio.buscarUsuarioById(idUsuario);
    if(usuario === null) {
        throw new Error("No se encontró el usuario");
    }

    const productos = await usuarioRepositorio.misProductos(usuario.idUsuario);
    return productos;
}

const leerUsuarioLogin = async (celular) => {
    return await usuarioRepositorio.buscarCelular(celular);
}

module.exports = {crearUsuario, leerUsuario, leerMisProductos, leerUsuarioLogin}