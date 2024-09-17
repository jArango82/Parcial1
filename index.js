'use strict'

var app = require('./application');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Parcial").then(
    ()=>{
        console.log("Conexion exitosa");
        app.listen(9898, function(){
            console.log("Aplicacion corriendo en el puerto 3000");
        })
    },
    err => {
        console.log("Error al conectar a la base de datos");
    }
)