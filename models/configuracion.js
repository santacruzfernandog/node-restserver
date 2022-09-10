const { DateTime } = require('luxon');


class ConfiguracionSchema {
    constructor(data){
        this.email = data.email;
        this.fecha = DateTime.now();
        this.configuracion = data.configuracion;
    }

    toArray(){
        return [
            this.email,
            this.configuracion,
            this.fecha
        ]
    }
    
    arrayToUpdate(){
        return [
            this.configuracion,
            this.fecha,
            this.email
        ]
    }
}


module.exports = ConfiguracionSchema