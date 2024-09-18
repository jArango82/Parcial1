'use strict'

var express = require('express');
var pelisController = require('../controllers/peliculas');
var autenticacionController = require('../controllers/autenticacion');
var validarToken = require('../helpers/authhelper');
var validar = require('../helpers/token');

var token = require('../helpers/authhelper');
var routes = express.Router();

routes.post('/api/peliculas',
    validarToken.validarToken,
    pelisController.crearPelicula
);

routes.put('/api/peliculas/:_id',
    validarToken.validarToken,
    pelisController.crearPelicula
);

routes.post('/api/usuarios',
    autenticacionController.registrarUsuario
)

routes.post('/api/login',
    autenticacionController.IniciarSesion
)

routes.get('/api/consulta',
    validar.validarToken,
    pelisController.consultarPelicula
)

routes.get('/api/parametros',
    validar.validarToken,
    pelisController.consultarParametros
)

module.exports = routes;