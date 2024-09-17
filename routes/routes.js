'use strict'

var express = require('express');
var pelisController = require('../controllers/peliculas');
var autenticacionController = require('../controllers/autenticacion');

var token = require('../helpers/authhelper');
var routes = express.Router();

routes.post('/api/peliculas',
    token.validarToken,
    pelisController.crearPelicula
);

routes.put('/api/peliculas/:_id',
    token.validarToken,
    pelisController.crearPelicula
);

routes.post('/api/usuarios',
    autenticacionController.registrarUsuario
)

routes.post('/api/login',
    autenticacionController.IniciarSesion
)

module.exports = routes;