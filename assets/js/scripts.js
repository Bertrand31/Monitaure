/**************************
 * GENERAL DATA HADNLING *
**************************/
// Update the table data
var updateCheck = function(check) {
    var target = $('tr#' + check.id);
    target.find('td.status').removeClass('ok nok').addClass(check.open ? 'ok' : 'nok');
    target.find('td.response-time').text(check.duration !== null ? check.duration + 'ms' : 'Timeout');
};
// Trigger updateCheck for each table row
var processData = function(data) {
    for(i = 0; i < data.length; i++) {
        updateCheck(data[i]);
    }
};

/***************
 * AJAX CALLS *
***************/
// Insert a check into the DB
var addCheck = function(form, callback) {
    var url = window.location.origin + '/Checks/create';
    $.ajax({
        url: url,
        method: form.attr('method'),
        data: form.serialize(),
        beforeSend: function() {},
        complete: function() {},
        success: function(data){callback(data);},
        error: function(data) {alert('error');console.log(data);},
    });
};
// Deletes a check from the DB
var destroyCheck = function(id, callback) {
    var url = window.location.origin + '/Checks/destroy';
    $.ajax({
        url: url,
        method: 'GET',
        data: {id: id},
        beforeSend: function() {},
        complete: function() {},
        success: function(data) {callback(data);},
        error: function(data) {alert('error');console.log(data);},
    });
};
// Get a check from the DB
var getCheck = function(id, callback) {
    var url = window.location.origin + '/Checks/show/'+id;
    $.ajax({
        url: url,
        method: 'GET',
        beforeSend: function() {},
        complete: function() {},
        success: function(data) {callback(data);},
        error: function(data) {alert('error');console.log(data);},
    });
};

/*********************
 * FRONT MANAGEMENT *
*********************/
// Add a line to the checks table
var addCheckLine = function (form) {
    addCheck(form, function(data) {
        $('#checks>tbody').append(
            '<tr id="'+data.id+'">' +
                '<td class="status"></td><td>'+data.name+'</td>' +
                '<td>'+data.domainNameOrIP+'</td>' +
                '<td>'+data.port+'</td>' +
                '<td class="response-time"></td>' +
                '<td><button class="destroy-check">Delete</button></td>' +
            '</tr>'
        );
    });
};
// Removes a row from the checks table
var destroyCheckRow = function(id) {
    destroyCheck(id, function(data) {
        data.forEach(function(item) {
            $('#checks tr#'+item.id).fadeOut(function() {
                $('#checks tr#'+item.id).remove();
            });
        });
    });
};
// Create a graph for the request row
var createGraph = function(id) {
    getCheck(id, function(data) {
        // Create graph
        console.log(data[0].history);
    });
};


$(document).ready(function() {

    var socket = io();

    // Update table data on 'checksData' event
    socket.on('checksData', function(data) {
        processData(data);
    });

    // Actions handling
    $('#check-add').on('submit', function(e) {
        e.preventDefault();
        addCheckLine($(this));
        $('#check-add')[0].reset();
    });
    $('#checks').on('click', '.destroy-check', function(e) {
        e.stopPropagation();
        var id = $(this).closest('tr').attr('id');
        destroyCheckRow(id);
    });
    $('#checks tbody').on('click', 'tr', function() {
        var id = $(this).attr('id');
        createGraph(id);
    });

});

