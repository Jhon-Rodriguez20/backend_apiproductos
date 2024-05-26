const usuarioControlador = require('../controllers/usuarioControlador');
const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.post("/crearUsuario", usuarioControlador.postUsuario);

router.get("/informacion",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getUsuario)

router.get("/misProductos",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getMisProductos)

router.post("/login",
    passport.authenticate("local", {session: false}),
    usuarioControlador.postSignin)

module.exports = router;