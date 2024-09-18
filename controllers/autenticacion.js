'use strict'

var Usuario = require('../models/usuarios');
var token = require('../helpers/authhelper');
var bcrypt = require('bcryptjs');


function registrarUsuario(req, resp){

    var parametros = req.body;

    if (!parametros.password || !parametros.nombre || !parametros.apellidos || !parametros.email) {
        return resp.status(400).send({ message: 'Faltan parámetros necesarios' });}

    var salt = bcrypt.genSaltSync(10);

    var password = bcrypt.hashSync(parametros.password, salt);
    var nuevoUsuario = new Usuario();
    nuevoUsuario.nombre = parametros.nombre;
    nuevoUsuario.apellidos = parametros.apellidos;
    nuevoUsuario.email = parametros.email;
    nuevoUsuario.password = password;
    nuevoUsuario.rol = parametros.rol;

    nuevoUsuario.save().then(
        (usuarioGuardado)=>{
            resp.status(200).send({message: usuarioGuardado})
        },
        err =>{
            resp.status(500).send({message: 'Error al guardar el usuario'})
        }
    );
            
}

function IniciarSesion (req, resp){
    var parametros = req.body;
    var emailIngresado = parametros.email;
    var passwordIngresado = parametros.password;

    Usuario.findOne({email: emailIngresado}).then(
        (usuarioEncontrado)=>{
            if(usuarioEncontrado == null){
                resp.status(403).send({message: 'Usuario no encontrado'});
            }
            else{
                console.log(usuarioEncontrado);
                if(bcrypt.compareSync(
                    passwordIngresado, usuarioEncontrado.password)){
                        resp.status(200).send({
                            message: 'Login exitoso',
                            token: token.generarTokenDeUsuario(usuarioEncontrado),
                        })
                    }
                    else{
                        resp.status(403).send({message: 'credenciales incorrecta'});
                    }
            }
        },
        (err)=>{
            resp.status(500).send({message: 'Error en el servidor'});
        }
    )

}

module.exports = {
    IniciarSesion, registrarUsuario
}
