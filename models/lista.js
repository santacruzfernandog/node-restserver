const { DateTime } = require('luxon');


class ListaSchema {
    constructor(data){
        this.nombrelista = data.nombrelista;
        this.tenantid = data.tenantid;
        this.usuario = data.usuario;
        this.fecha = DateTime.now();
    }

    toArray(){
        return [
            this.nombrelista,
            this.fecha,
            this.usuario,
            this.tenantid
        ]
    }
}


module.exports = ListaSchema