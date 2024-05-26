class ProductoDatosResModel {
    constructor(producto) {
        this.idProducto = producto.idProducto;
        this.nombreProducto = producto.nombreProducto;        
        this.precio = producto.precio;
        this.descripcion = producto.descripcion;
        this.urlImagen = producto.urlImagen;
        this.idUsuario = producto.idUsuario;
        this.nombreUsuario = producto.nombreUsuario;
        this.fecha = producto.fecha;
    }
}

class ProductoActualizarReqModel {
    constructor(producto) {
        this.nombreProducto = producto.nombreProducto;
        this.precio = producto.precio;
        this.descripcion = producto.descripcion;
    }
}

class ProductoEntity {
    constructor(producto) {
        this.idProducto = producto.idProducto;
        this.nombreProducto = producto.nombreProducto;
        this.precio = producto.precio;
        this.descripcion = producto.descripcion;
        this.urlImagen = producto.urlImagen;
        this.idUsuario = producto.idUsuario;
        this.fecha = producto.fecha;
    }
}

module.exports = { ProductoDatosResModel, ProductoActualizarReqModel, ProductoEntity }