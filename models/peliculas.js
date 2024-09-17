'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PeliculaSchema = Schema({
    titulo: String,
    productora: String,
    director: String,
    lanzamiento: Number,
    precio: Number
});

module.exports =
    mongoose.model('Pelicula', PeliculaSchema);