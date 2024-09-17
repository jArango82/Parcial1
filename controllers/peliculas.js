'use strict'

var peliculas = require('../models/peliculas');


function crearPelicula(req, resp){
    var peliculaRecibido = req.body;

    var nuevaPelicula = new peliculas();
    nuevaPelicula.titulo = peliculaRecibido.titulo;
    nuevaPelicula.productora = peliculaRecibido.productora;
    nuevaPelicula.director = peliculaRecibido.director;
    nuevaPelicula.lanzamiento = peliculaRecibido.lanzamiento;
    nuevaPelicula.precio = peliculaRecibido.precio;

    nuevaPelicula.save().then(
        (peliculaGuardada)=>{
            resp.status(200).send({peliculaCreada: peliculaGuardada});
        },
        err => {
            resp.status(500).send({message: 'Error al guardar la pelicula'});
        }
    )
}

function editarPelicula(req, resp){
    var idPelicula = req.params.id;
    var datosNuevos = req.body;

    var peliculaEditar = new peliculas();
    peliculaEditar._id = idPelicula;
    peliculaEditar.titulo = datosNuevos.titulo;
    peliculaEditar.productora = datosNuevos.productora;
    peliculaEditar.director = datosNuevos.director;
    peliculaEditar.lanzamiento = datosNuevos.lanzamiento;
    peliculaEditar.precio = datosNuevos.precio;

    cursos.findByIdAndUpdate(
        idPelicula,
        peliculaEditar,
        {new: true}).then(
            (peliculaActualizada)=>{
                resp.status(200).send({peliculaActualizada: peliculaActualizada});
            },
            err => {
                resp.status(500).send({message: 'Error al actualizar la pelicula'});
            }
        )

}

module.exports = {
    crearPelicula, editarPelicula
}