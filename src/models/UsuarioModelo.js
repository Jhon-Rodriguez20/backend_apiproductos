class UsuarioCrearReqModel {
    constructor(usuario) {
        this.nombre = usuario.nombre;
        this.celular = usuario.celular;
        this.password = usuario.password;
    }
}

class UsuarioDatosResModel {
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario;
        this.nombre = usuario.nombre;
        this.celular = usuario.celular;
    }
}

class UsuarioEntity {
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario;
        this.nombre = usuario.nombre;
        this.celular = usuario.celular;
        this.passwordEncp = usuario.passwordEncp;
    }
}

module.exports = {UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioEntity}