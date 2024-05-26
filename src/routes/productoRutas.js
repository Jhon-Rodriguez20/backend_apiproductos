const { Router } = require('express');
const productoControlador = require('../controllers/productoControlador');
const passport = require('passport');
const router = Router();

router.post("/producto", passport.authenticate("jwt", {session: false}),
    productoControlador.subirImagen, productoControlador.postProducto)

router.get("/productos", productoControlador.getProductos)

router.get("/producto/:id", productoControlador.getDetalleProducto)

router.put("/producto/:id", passport.authenticate("jwt", {session: false}),
    productoControlador.putProducto)

router.delete("/producto/:id", passport.authenticate("jwt", {session: false}),
    productoControlador.deleteProducto)

module.exports = router;