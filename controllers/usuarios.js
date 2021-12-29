const { response, request } = require('express');


const usuariosGet = (req = request, response) => {

    const { q, nombre, apikey } = req.query;

    response.status(200).json({
        msg: 'Get API - Controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req = request, response) => {

    const { nombre, edad } = req.body;

    response.status(200).json({
        msg: 'Post API - Controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req = request, response) => {

    const {id} = req.params;

    response.status(200).json({
        msg: 'Put API - Controlador',
        id
    });
}


const usuariosDelete = (req = request, response) => {
    response.status(200).json({
        msg: 'Delete API - Controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}