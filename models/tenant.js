const { DateTime } = require('luxon');


class TenantSchema {
    constructor(data){
        this.tenantid = data.tenantid;
        this.usuario = data.usuario;
        this.fechaalta = DateTime.now();
        this.plan = data.plan;
        this.pago = data.pago;
        this.customerid = data.customerid;
        this.fechamodificacion = data.fechamodificacion;
        this.idsuscripcion = data.idsuscripcion;
        this.avisolegalaceptado = data.avisolegalaceptado;
    }

    toArray(){
        return [
            this.tenantid,
            this.usuario,
            this.fechaalta,
            this.plan,
            this.pago,
            this.customerid,
            this.fechamodificacion,
            this.idsuscripcion,
            this.avisolegalaceptado
        ]
    }
}

module.exports = TenantSchema