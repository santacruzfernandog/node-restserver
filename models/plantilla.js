

class PlantillaSchema {
    constructor(data){
        this.tenantid = data.tenantid;
        this.nombreplantilla = data.nombreplantilla;
        this.mensajegenerico = data.mensajegenerico;
        this.fecha = new Date();
        this.usuario = data.usuario;
    }

    toArray(){
        return [
            this.nombreplantilla,
            this.mensajegenerico,
            this.fecha,
            this.usuario,
            this.tenantid
        ]
    }
}

module.exports = PlantillaSchema