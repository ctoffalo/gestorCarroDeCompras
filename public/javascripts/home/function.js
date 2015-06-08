'use strict';

var gestorFormasDePago = new GestorFormasDePago();
$(document).ready(function(){
var gestorDePrecios = new GestorDePrecios();
    gestorFormasDePago.gestorDePrecios = gestorDePrecios;
    var data = {
        hshFormasDePago: hshFormasDePago
    };
    var html = new EJS({url: '/javascripts/home/views-ejs/selectorFormasDePago.ejs'}).render(data);
    $('#contenedorFormasDePago').html(html);
    gestorFormasDePago.init(hshFormasDePago);
  
  
  
  /*le bindeo el evento change al combo1 para que al seleccionar la forma de pago haga la correspondiente accion*/
  $("#combo1").on("change",function(){
    if($("#" + $(this).attr("id") + " option:selected").data("tipo") == 'collection'){
      gestorFormasDePago.renderBox('combo2');
    }else if($("#" + $(this).attr("id") + " option:selected").data("tipo") == 'no-collection'){
      $('#container-combo2').html('');
      $('#container-combo3').html('');
      gestorFormasDePago.setFormaDePagoSeleccionada('combo1',$(this).val());
      gestorFormasDePago.gestorDePrecios.init();
    }else if($(this).val() == ''){
      $('#container-combo2').html('');
      $('#container-combo3').html('');
    }
  })
  
  if(localStorage.formaDePagoSeleccionada != undefined && $("#combo1").length == 1){
      gestorFormasDePago.setValoresSelector();
    }
})
