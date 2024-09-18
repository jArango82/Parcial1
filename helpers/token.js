'use strict'

const { response } = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "070320";
var useer = require('../models/usuarios');

function generarTokenDeUsuario(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'minutos').unix
    }
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep){
    try{
        
            var tokenEnviadoPorUsuario = req.headers.authorization;
            var tokenLimpio = tokenEnviadoPorUsuario.replace('Bearer ', '');
            var payload = jwt.decode(tokenLimpio, secret);
            req.headers.userId = payload.sub;
            nextStep();
    }
    catch(ex){
        resp.status(403).send({message: 'Token inválido'});
    }
}

module.exports = {
    generarTokenDeUsuario, validarToken
}