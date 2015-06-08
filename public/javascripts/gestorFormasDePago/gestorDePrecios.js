var GestorDePrecios = function(){
  var public_init = function(){
    if(localStorage.formaDePagoSeleccionada != undefined){
      var formaDePagoSeleccionada = JSON.parse(localStorage.formaDePagoSeleccionada);
      if(formaDePagoSeleccionada.tipoFormaDePago == 'collection'){
        var nombreFormaDePago = formaDePagoSeleccionada.tarjeta.nombreTarjeta;
        var cuotas = formaDePagoSeleccionada.tarjeta.cuotas;
        
        $(".formaDePago").html('Estas pagando con ' + nombreFormaDePago + ' en ' + cuotas.cantidadCuotas);
        var idListaDePrecioSeleccionada = formaDePagoSeleccionada.tarjeta.cuotas.idListaPrecio;
        $('.precio-gestor').each(function(){
          var listas = $(this).data('l').split('#'); 
              for(var lista in listas){
                var idListadePrecio = listas[lista].split('_')[0].split(':')[1];
                if(idListadePrecio == idListaDePrecioSeleccionada){
                  var precio = parseFloat(listas[lista].split('_')[1].split(':')[1].replace('$','').replace(',','.'));
                  /*var precio = parseFloat($(this).text().replace('$','').replace(',','.'));*/
                }
              }
          
          
          var precioDeListaCorrespondiente = precio * parseFloat(cuotas.ratio);
          $(this).html('$ ' + precioDeListaCorrespondiente.toFixed(2).replace('.',','))
          /**hay un problema por el cual recorre 2 veces este bucle*/
        })
        
      }else if(formaDePagoSeleccionada.tipoFormaDePago == 'cash') {
        var idListaDePrecioSeleccionada = formaDePagoSeleccionada.idListaPrecio;
        var nombreFormaDePago = formaDePagoSeleccionada.nombreFormaDePago;
        var descripcionFormaDePago= 'Estas pagando con ' + nombreFormaDePago;
        $(".formaDePago").html( descripcionFormaDePago);   
        
         $('.precio-gestor').each(function(){
          var descuentoFormaDePago = (formaDePagoSeleccionada.descuentoFormaDePago == undefined)? 1 : formaDePagoSeleccionada.descuentoFormaDePago;
          var listas = $(this).data('l').split('#'); 
              for(var lista in listas){
                var idListadePrecio = listas[lista].split('_')[0].split(':')[1];
                if(idListadePrecio == idListaDePrecioSeleccionada){
                  var precio = parseFloat(listas[lista].split('_')[1].split(':')[1].replace('$','').replace(',','.'));
                  /*var precio = parseFloat($(this).text().replace('$','').replace(',','.'));*/
                }
              }
          var precioDeListaCorrespondiente = precio - (( precio * parseFloat(descuentoFormaDePago) ) / 100);
          $(this).html('$ ' + precioDeListaCorrespondiente.toFixed(2).replace('.',','))
          /**hay un problema por el cual recorre 2 veces este bucle*/
        })
      }
    }
  }
  
  return {
    init: public_init
  }
}
