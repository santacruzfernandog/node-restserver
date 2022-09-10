const express = require('express');
const cors = require('cors');


let sesiones = [];

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.tenantsPath = '/api/tenants';
        this.authPath = '/api/auth';
        this.listasPath = '/api/listas';
        this.contactosPath = '/api/contactos';
        this.historialPath = '/api/historial';
        this.schedulesPath = '/api/schedules';
        this.plantillasPath = '/api/plantillas';
        this.usuariosPath = '/api/usuarios';
        this.configuracionesPath = '/api/configuraciones';
        this.whatsappQrRequestPath = '/api/whatsapp';

        // Middlewares
        this.middlewares();

        // Rutas de la App
        this.routes();

        // Sesiones de Whatsapp

        // Manejo de excepciones globales
        this.anyExceptionCatch();
    }

    // ----- Middlewares
    middlewares() {
        // CORS
        this.app.use( cors() )

        // lectura y parseo del body
        this.app.use( express.json() )

        // TODO: Apuntar a la carpeta ./build de React
        this.app.use( express.static('public') )
    }


    // ----- Rutas
    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.tenantsPath, require('../routes/tenants'))
        this.app.use(this.listasPath, require('../routes/listas'))
        this.app.use(this.contactosPath, require('../routes/contactos'))
        this.app.use(this.historialPath, require('../routes/historial'))
        this.app.use(this.schedulesPath, require('../routes/schedules'))
        this.app.use(this.plantillasPath, require('../routes/plantillas'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.configuracionesPath, require('../routes/configuraciones'))
        this.app.use(this.whatsappQrRequestPath, require('../routes/whatsapp'))
    }


    anyExceptionCatch() {
        // Errores no manejados: Avoid app crash
        process.on('uncaughtException', function(error) {
            console.log('Excepción capturada | ' + error)
        });
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`)
        })
    }
}



module.exports = { Server, sesiones }