"use strict";
var GestorFormasDePago = (function(){
  /*variables y colecciones*/
  var coleccionFormasDePago;
  /*************************/

  /*Metodos publicos*/
  var public_init = function(coleccionFormasDePago){
    this.coleccionFormasDePago = coleccionFormasDePago;
    if(localStorage.formaDePagoSeleccionada == undefined){
      this.setFormaDePagoInicial();
    }
    
  };
  var public_set_forma_de_pago_inicial = function(){
    for(var fp in this.coleccionFormasDePago){
      if(this.coleccionFormasDePago[fp].coleccionDeTarjetas == null){
        if(this.coleccionFormasDePago[fp].formaDePagoDefault){
          this.setFormaDePagoSeleccionada('combo1', this.coleccionFormasDePago[fp].idFormaDePago);
          break;
        }
      }else{
        for(var t in this.coleccionFormasDePago[fp].coleccionDeTarjetas){//=> recorro las tarjetas
          for(var c in this.coleccionFormasDePago[fp].coleccionDeTarjetas[t].coleccionCuotas){ //=>recorro las cuotas de esa tarjeta
            if(this.coleccionFormasDePago[fp].coleccionDeTarjetas[t].coleccionCuotas[c].formaDePagoDefault){
                        this.setFormaDePagoSeleccionada('combo3',this.coleccionFormasDePago[fp].idFormaDePago,this.coleccionFormasDePago[fp].coleccionDeTarjetas[t].idTarjeta,this.coleccionFormasDePago[fp].coleccionDeTarjetas[t].coleccionCuotas[c].cantidadCuotas);
                                         
            }
          }
        } 
      }
    }
    
   
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
            gestorFormasDePago.setFormaDePagoSeleccionada('combo3',$('combo2').val());
           }
         })
        
        
        break;

    }
  };

  var public_set_forma_de_pago_seleccionada = function(idComboSeleccion,idFormaDePagoSelecionada,valCombo2,valCombo3){
    switch(idComboSeleccion){
      case 'combo1': 
          for (fp in this.coleccionFormasDePago) {
            if(this.coleccionFormasDePago[fp].idFormaDePago == idFormaDePagoSelecionada){
              localStorage.clear(); //=> limpio el localStorage
              localStorage.setItem('fpSelec', JSON.stringify(this.coleccionFormasDePago[fp]));
            }
          }
        break;
      case 'combo3':
          var formaDePagoLocalStorage = [];
          for (var fp in this.coleccionFormasDePago) {
             if(this.coleccionFormasDePago[fp].idFormaDePago == idFormaDePagoSelecionada){
                  var coleccionDeTarjetas = this.coleccionFormasDePago[fp].coleccionDeTarjetas;
                  var idTarjeta = (valCombo2 == undefined)?$('#combo2').val():valCombo2; 
                  for (var t in coleccionDeTarjetas){
                    if(coleccionDeTarjetas[t].idTarjeta == idTarjeta){
                      var coleccionCuotas = coleccionDeTarjetas[t].coleccionCuotas;
                      var cuotasSeleccionadas = (valCombo3 == undefined)?$('#combo3').val():valCombo3;
                      for (var c in coleccionDeTarjetas[t].coleccionCuotas){
                        if(coleccionCuotas[c].cantidadCuotas == cuotasSeleccionadas){
                          formaDePagoLocalStorage = $.extend({},this.coleccionFormasDePago[fp]);
                          delete formaDePagoLocalStorage.coleccionDeTarjetas;
                          formaDePagoLocalStorage.tarjeta =  $.extend({},coleccionDeTarjetas[t]);
                          delete formaDePagoLocalStorage.tarjeta.coleccionCuotas;
                          formaDePagoLocalStorage.tarjeta.cuotas = coleccionDeTarjetas[t].coleccionCuotas[c];
                          localStorage.clear();
                          localStorage.formaDePagoSeleccionada = JSON.stringify(formaDePagoLocalStorage);
                          break;
                        }
                      }
                    }
                  }
                }

          }
        break;
    }
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
    searchFormaDePago: public_search_forma_de_pago_seleccionada,
    setFormaDePagoInicial: public_set_forma_de_pago_inicial
  }
})