const fs = require('fs');
const path = require('path');
const productoRepositorio = require('../db/repositorios/productoRepositorio');
const usuarioRepositorio = require('../db/repositorios/usuarioRepositorio');
const { ProductoEntity } = require('../models/ProductoModelo');
const crypto = require('crypto');

const crearProducto = async (producto) => {
    if (!producto.nombreProducto || !producto.precio || !producto.descripcion || !producto.urlImagen || !producto.idUsuario) {
        throw new Error('Datos vacíos o incorrectos');
    }

    producto.idProducto = crypto.randomUUID();
    producto.fecha = new Date();

    await productoRepositorio.crear(new ProductoEntity(producto));
    return await productoRepositorio.detalle(producto.idProducto);
}

const leerProductos = async () => {
    return await productoRepositorio.leer();
}

const detalleProducto = async (idProducto) => {
    return await productoRepositorio.detalle(idProducto);
}

const actualizarProducto = async (idProducto, producto, idUsuario) => {
    if (!producto.nombreProducto || !producto.precio || !producto.descripcion) {
        throw new Error('Datos vacíos o incorrectos');
    }

    const productoDetalle = await productoRepositorio.detalleProducto(idProducto);
    const usuario = await usuarioRepositorio.buscarUsuarioById(idUsuario);

    if (productoDetalle.idUsuario !== usuario.idUsuario) {
        throw new Error('No se puede actualizar el producto');
    }

    productoDetalle.nombreProducto = producto.nombreProducto;
    productoDetalle.precio = producto.precio;
    productoDetalle.descripcion = producto.descripcion;

    await productoRepositorio.actualizar(productoDetalle);
    return await productoRepositorio.detalle(productoDetalle.idProducto);
}

const eliminarImagen = (urlImagen) => {
    const filePath = path.join(__dirname, '../uploads', urlImagen);
    fs.unlink(filePath, () => {});
}

const eliminarProducto = async (idProducto, idUsuario) => {
    const productoDetalle = await productoRepositorio.detalleProducto(idProducto);
    if (!productoDetalle) {
        throw new Error('Producto no encontrado');
    }

    const usuario = await usuarioRepositorio.buscarUsuarioById(idUsuario);

    if (productoDetalle.idUsuario !== usuario.idUsuario) {
        throw new Error('No se puede eliminar el producto');
    }

    eliminarImagen(productoDetalle.urlImagen);
    await productoRepositorio.eliminar(productoDetalle.idProducto);
}

module.exports = { crearProducto, leerProductos, detalleProducto, actualizarProducto, eliminarProducto };