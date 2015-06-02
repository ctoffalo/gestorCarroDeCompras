'use strict';
var gestorFormasDePago = new GestorFormasDePago();
var gestorDePrecios = new GestorDePrecios();
    gestorFormasDePago.gestorDePrecios = gestorDePrecios;
    gestorFormasDePago.init(hshFormasDePago);

$(document).ready(function(){
    var data = {
        hshFormasDePago: hshFormasDePago
    };
    var html = new EJS({url: '/javascripts/home/views-ejs/selectorFormasDePago.ejs'}).render(data);
    $('#contenedorFormasDePago').html(html);
  
  
  
  /*le bindeo el evento change al combo1 para que al seleccionar la forma de pago haga la correspondiente accion*/
  $("#combo1").on("change",function(){
    if($("#" + $(this).attr("id") + " option:selected").data("tipo") == 'collection'){
      gestorFormasDePago.renderBox('combo2');
    }else if($("#" + $(this).attr("id") + " option:selected").data("tipo") == 'no-collection'){
      $('#container-combo2').html('');
      $('#container-combo3').html('');
      gestorFormasDePago.setFormaDePagoSeleccionada('combo1',$(this).val());
    }else if($(this).val() == ''){
      $('#container-combo2').html('');
      $('#container-combo3').html('');
    }
  })
  
  if(localStorage.formaDePagoSeleccionada != undefined){
      gestorFormasDePago.setValoresSelector();
    }
})
