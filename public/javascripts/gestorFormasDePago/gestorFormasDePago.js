"use strict";
var GestorFormasDePago = (function(){
  /*variables y colecciones*/
  var coleccionFormasDePago;
  /*************************/

  /*Metodos publicos*/
  var public_init = function(coleccionFormasDePago){
    this.coleccionFormasDePago = coleccionFormasDePago;
  };

  var public_render_box = function(nroCombo){
    switch(nroCombo){
      case 'combo2':
        /*detecto el id de forma de pago (en la coleccion) que coincida con el seleccionado y extraigo sus tarjetas*/
        var coleccionDeTarjetas = this.searchFormaDePago();
        /*renderizo el combo2*/
        var data = {
          coleccionDeTarjetas: coleccionDeTarjetas
        };
        var html = new EJS({url: '/javascripts/home/views-ejs/combo2.ejs'}).render(data);
        $('#container-combo2').html(html); 
        
         $('#combo2').on('change',function(){
            if($(this).val() != ''){
              gestorFormasDePago.renderBox('combo3');
            }else if($(this).val() == ''){
              $('#container-combo3').html('');
            }  
         })
        
        break;
        
      case 'combo3': 
         var coleccionDeTarjetas = this.searchFormaDePago();
        /*detecto el id de tarjeta (en la coleccion) que coincida con el seleccionado y extraigo sus cuotas*/
        var idTarjetaSeleccionada = $('#combo2').val();
        for (var t in coleccionDeTarjetas){
          if(idTarjetaSeleccionada == coleccionDeTarjetas[t].idTarjeta){
            var coleccionCuotas =  coleccionDeTarjetas[t].coleccionCuotas;
            break;
          }
        }
        /*renderizo el combo3*/
         var data = {
          coleccionCuotas: coleccionCuotas
        };
        var html = new EJS({url: '/javascripts/home/views-ejs/combo3.ejs'}).render(data);
        $('#container-combo3').html(html); 
        
         $('#combo3').on('change',function(){
           /*gestorFormasDePago.renderBox('combo3');*/
           if($(this).val() != ''){
            console.log('seteo de forma de pago');
           }
         })
        
        
        break;

    }
  };

  var public_set_forma_de_pago_seleccionada = function(idFormaDePagoSelecionada){
    console.log(idFormaDePagoSelecionada);
  }

  var public_search_forma_de_pago_seleccionada = function(){
     var idFormaDePagoSeleccionada = $('#combo1').val();
      for (var fp in this.coleccionFormasDePago){
        if(idFormaDePagoSeleccionada == this.coleccionFormasDePago[fp].idFormaDePago){
          var coleccionDeTarjetas = this.coleccionFormasDePago[fp].coleccionDeTarjetas;
          break;
        }
      }
    return coleccionDeTarjetas;
  }
  /******************/

  return{
    init: public_init,
    renderBox: public_render_box,
    setFormaDePagoSeleccionada: public_set_forma_de_pago_seleccionada,
    searchFormaDePago: public_search_forma_de_pago_seleccionada
  }
})