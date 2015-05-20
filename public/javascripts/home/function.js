'use strict';
$(document).ready(function(){
    var data = ({
        hshFormasDePago: hshFormasDePago
    });
    var html = new EJS({url: '/javascripts/home/views-ejs/selectorFormasDePago.ejs'}).render(data);
    $('#contenedorFormasDePago').html(html);
})