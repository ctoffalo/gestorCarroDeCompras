/*hshFormasDePago contiene todas las colecciones y sus respectivas relaciones*/
hshFormasDePago = [{
    idFormaDePago : 10,
    tipoFormaDePago: 'cash',
    nombreFormaDePago: 'Efectivo en sucursal',
    descuentoFormaDePago: 40,
    coleccionDeTarjetas: null,
    
},{
    idFormaDePago : 11,
    tipoFormaDePago: 'collection',
    nombreFormaDePago: 'Tarjeta de crédito',
    descuentoFormaDePago: null,
    coleccionDeTarjetas: [{
        idTarjeta: 266,
        nombreTarjeta: 'American Express',
        caracteristicaTarjeta: 'American Express',
        coleccionCuotas: [{
            cantidadCuotas: 1,
            ratio: 0.7,
            idListaPrecio: 1
        },{
            cantidadCuotas: 12,
            ratio: 0.8,
            idListaPrecio: 1
        },{
            cantidadCuotas: 18,
            ratio: 0.9,
            idListaPrecio: 1
        },{
            cantidadCuotas: 24,
            ratio: 1,
            idListaPrecio: 1,
            formaDePagoDefault: true
        }]
    },{
        idTarjeta: 267,
        nombreTarjeta: 'Argencard',
        caracteristicaTarjeta: 'Visa',
        coleccionCuotas: [{
            cantidadCuotas: 1,
            ratio: 1,
            idListaPrecio: 1
        },{
            cantidadCuotas: 6,
            ratio: 0.75,
            idListaPrecio: 1
        },{
            cantidadCuotas: 12,
            ratio: 0.7,
            idListaPrecio: 1
        },{
            cantidadCuotas: 18,
            ratio: 0.9,
            idListaPrecio: 1
        },{
            cantidadCuotas: 24,
            ratio: 1,
            idListaPrecio: 1
        }]

    }]
}]