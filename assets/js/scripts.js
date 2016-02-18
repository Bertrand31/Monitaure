var addCheck = function(form) {
    var url = window.location.origin + '/Checks/create';
    //$.post(url, data, function(res) { console.log(res); });
    $.ajax({
        url: url,
        method: form.attr('method'),
        data: form.serialize(),
        beforeSend: function() {},
        complete: function() {},
        success: function(data){addCheckLine(data);},
        error: function(data) {console.log(data);},
    });

};
var addCheckLine = function (data) {
    $('#checks>tbody').append('<tr id="'+data.id+'"><td>OK</td><td>'+data.name+'</td><td>'+data.domainNameOrIP+'</td><td>'+data.port+'</td><td class="response-time"></td><td><button class="destroy-check">Delete</button></td></tr>');
};

var destroyCheck = function(data) {
    var url = window.location.origin + '/Checks/destroy';
    $.ajax({
        url: url,
        method: 'GET',
        data: data,
        beforeSend: function() {},
        complete: function() {},
        success: function(data) {destroyCheckLine(data);},
        error: function(data) {alert('error');console.log(data);},
    });

};
var destroyCheckLine = function(data) {
    data.forEach(function(item) {
        $('#checks tr#'+item.id).remove();
    });
};

$(document).ready(function() {

    var socket = io();

    $('#check-add').on('submit', function(e) {
        e.preventDefault();
        addCheck($(this));
    });

    $('.destroy-check').click(function(e) {
        var idTarget = $(this).closest('tr').attr('id');
        destroyCheck({id: idTarget});
    });

    socket.on('checksData', function(data) {
        for(i = 0; i < data.length; i++) {
            var target = $('tr#' + data[i].id);
            target.find('td.response-time').text(data[i].duration + 'ms');
            target.find('td.status').text(data[i].open ? 'OK' : 'NOK');
        }
    });
});

