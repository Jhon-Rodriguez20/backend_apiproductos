const conexion = require('../conexionDB');

const crear = async (producto) => {
    const connection = await conexion.conexionMysql();
    const query = "INSERT INTO producto SET ?";
    await connection.query(query, producto);
    connection.release();
}

const leer = async () => {
    const connection = await conexion.conexionMysql();
    const query = `
        SELECT
            producto.idProducto,
            producto.nombreProducto,
            producto.precio,
            producto.descripcion,
            REPLACE(CONCAT('/uploads/', REPLACE(producto.urlImagen, ' ', '_')), ' ', '_') AS urlImagen,
            producto.idUsuario,
            producto.fecha,
            usuario.idUsuario,
            usuario.nombre AS nombreUsuario
        FROM producto
        INNER JOIN usuario ON usuario.idUsuario = producto.idUsuario
    `;
    const [rows] = await connection.query(query);
    connection.release();
    return rows;
}

const detalle = async (idProducto) => {
    const connection = await conexion.conexionMysql();
    const query = `
        SELECT
            producto.idProducto,
            producto.nombreProducto,
            producto.precio,
            producto.descripcion,
            REPLACE(CONCAT('/uploads/', REPLACE(producto.urlImagen, ' ', '_')), ' ', '_') AS urlImagen,
            producto.idUsuario,
            producto.fecha,
            usuario.idUsuario,
            usuario.nombre
        FROM producto
        INNER JOIN usuario ON usuario.idUsuario = producto.idUsuario
        WHERE producto.idProducto = ?
    `;
    const [rows] = await connection.query(query, [idProducto]);
    connection.release();
    return rows[0];
}

const detalleProducto = async (idProducto) => {
    const connection = await conexion.conexionMysql();
    const query = `SELECT idProducto, idUsuario, urlImagen FROM producto WHERE idProducto = ?`;
    const [rows] = await connection.query(query, [idProducto]);
    connection.release();
    return rows[0];
}

const actualizar = async (productoDetalle)=> {
    const connection = await conexion.conexionMysql();
    const query = "UPDATE producto SET ? WHERE idProducto = ?";
    const [rows] = await connection.query(query, [productoDetalle, productoDetalle.idProducto]);
    connection.release();
}

const eliminar = async (idProducto)=> {
    const connection = await conexion.conexionMysql();
    const query = "DELETE FROM producto WHERE idProducto = ?";
    const [rows] = await connection.query(query, [idProducto]);
    connection.release();
}

module.exports = {crear, leer, detalle, detalleProducto, actualizar, eliminar}