const { DateTime } = require('luxon');
const { default: phone } = require('phone');


class ContactoSchema {
    constructor(data){
        this.idcontacto = data.idcontacto;
        this.tenantid = data.tenantid;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.empresa = data.empresa;
        this.cargo = data.cargo;
        this.pais = phone(`+${data.numero}`).countryIso2;
        this.numero = data.numero;
        this.idlista = data.idlista;
        this.observaciones = data.observaciones;
        // this.fecha = DateTime.now();
        this.fecha = new Date();
        this.usuario = data.usuario;
    }

    toArrayWithId(){
        return [
            this.idcontacto,
            this.nombre,
            this.apellido,
            this.empresa,
            this.cargo,
            this.pais,
            this.numero,
            this.idlista,
            this.observaciones,
            this.fecha
        ]
    }

    toArrayWithoutId(){
        return [
            this.nombre,
            this.apellido,
            this.empresa,
            this.cargo,
            this.pais,
            this.numero,
            this.idlista,
            this.observaciones,
            this.fecha,
            this.usuario,
            this.tenantid,
        ]
    }
}

module.exports = ContactoSchema