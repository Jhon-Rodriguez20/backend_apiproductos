const conexion = require('../conexionDB');

const crear = async (usuario)=> {
    const connection = await conexion.conexionMysql();
    const query = "INSERT INTO usuario SET ?";
    await connection.query(query, usuario);
    connection.release();
}

const leer = async (idUsuario)=> {
    const connection = await conexion.conexionMysql();
    const query = "SELECT idUsuario, nombre, celular FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows[0];
}

const buscarUsuario = async (usuario) => {
    const connection = await conexion.conexionMysql();
    const query = "SELECT * FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [usuario]);
    connection.release();
    return rows[0] || null;
}

const buscarCelular = async (celular) => {
    const connection = await conexion.conexionMysql();
    const query = "SELECT * FROM usuario WHERE celular = ?";
    const [rows] = await connection.query(query, [celular]);
    connection.release();
    return rows[0] || null;
}

const buscarUsuarioById = async (idUsuario) => {
    const connection = await conexion.conexionMysql();
    const query = "SELECT idUsuario FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows[0] || null;
}

const misProductos = async (idUsuario) => {
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
        WHERE usuario.idUsuario = ?
    `;
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows;
}

module.exports = {crear, leer, buscarUsuario, buscarCelular, buscarUsuarioById, misProductos}