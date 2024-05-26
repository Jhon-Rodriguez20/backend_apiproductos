const multer = require('multer');
const path = require('path');
const productoServicio = require('../services/productoServicio');
const { ProductoDatosResModel, ProductoActualizarReqModel } = require('../models/ProductoModelo');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsPath = path.join(__dirname, '../uploads');
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        const nombreImagen = file.originalname.replace(/\s+/g, '-').toLowerCase();
        cb(null, `${Date.now()}-${nombreImagen}`);
    }
});

const upload = multer({ storage: storage });
const subirImagen = upload.single('imagen');

const postProducto = async (req, res) => {
    try {
        if (!req.user.error) {
            const { nombreProducto, precio, descripcion } = req.body;
            const urlImagen = req.file.filename;

            const producto = await productoServicio.crearProducto({ nombreProducto, precio, descripcion, urlImagen, idUsuario: req.user.sub });
            res.status(201).json({ productoEntity: new ProductoDatosResModel(producto) });
        } else {
            res.status(401).json({ mensaje: 'El usuario no tiene permisos para realizar esta acción' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
    }
}

const getProductos = async (req, res) => {
    try {
        const arrayProductos = await productoServicio.leerProductos();
        const losProductos = arrayProductos.map(producto => new ProductoDatosResModel(producto));
        res.status(200).json({ productoEntity: losProductos });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al leer los productos', error: error.message });
    }
}

const getDetalleProducto = async (req, res) => {

    try {
        const detalleProducto = await productoServicio.detalleProducto(req.params.id);
        res.status(200).json({ productoEntity: new ProductoDatosResModel(detalleProducto) });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al leer el detalle del producto', error: error.message });
    }
}

const putProducto = async (req, res) => {

    try {
        if(!req.user.error) {
            const producto = await productoServicio.actualizarProducto(req.params.id, new ProductoActualizarReqModel(req.body), req.user.sub);
            res.status(201).json({ productoEntity: new ProductoDatosResModel(producto) });
        
        } else {
            res.status(401).json({ mensaje: 'El usuario no tiene permisos para realizar esta acción' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
}

const deleteProducto = async (req, res) => {
    try {
        if (!req.user.error) {
            await productoServicio.eliminarProducto(req.params.id, req.user.sub);
            res.status(204).json({ mensaje: 'Producto eliminado con éxito' });
        } else {
            res.status(401).json({ mensaje: 'El usuario no tiene permisos para realizar esta acción' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
}

module.exports = { subirImagen, postProducto, getProductos, getDetalleProducto, putProducto, deleteProducto }