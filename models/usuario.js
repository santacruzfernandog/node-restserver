const { DateTime } = require('luxon');


class UsuarioSchema {
    constructor(data){
        this.email = data.email;
        this.fecha = DateTime.now();
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.telefono = data.telefono;
        this.empresa = data.empresa;
        this.pais = data.pais;
        this.terminosaceptados = data.terminosaceptados;
    }

    toArray(){
        return [
            this.email,
            this.nombre,
            this.fecha,
            this.apellido,
            this.empresa,
            this.telefono,
            this.pais,
            this.terminosaceptados
        ]
    }
}


module.exports = UsuarioSchema