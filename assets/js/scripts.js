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
        if (data[i].id === currentChartId) {
            addDataToChart(data[i]);
        }
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
    var url = window.location.origin + '/Checks/destroy/'+id;
    $.ajax({
        url: url,
        method: 'GET',
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
// Create a chart for the request row
var createChart = function(id, chartContainer) {
    getCheck(id, function(check) {
        checkToChartData(check[0], function(chartData) {
            chart = new Chart(chartContainer, {
                type: 'line',
                data: chartData,
            });
        });

    });
};
var addDataToChart = function(data) {
    var lightDate = moment(data.date).format('hh:mm');
    console.log(chart);
    chart.addElements(data.duration, lightDate);
};

/**************
 * UTILITIES *
 **************/
var checkToChartData = function(check, callback) {
    var chartData = {
        labels: [],
        datasets: [{
            label: check.name,
            data: []
        }]
    };
    for (i=0; i<check.history.length; i++) {
        var lightDate = moment(check.history[i].date).format('hh:mm');
        chartData.labels.push(lightDate);
        chartData.datasets[0].data.push(check.history[i].time);
    }
    callback(chartData);
};

var currentChartId = '',
    chart;

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
		currentChartId = id;
        var chartContainer = document.getElementById('main-chart');
        createChart(id, chartContainer);
    });

});

