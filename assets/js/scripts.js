var chartContainer = document.getElementById('mainChart');
var chartOptions = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                id: '56c7b06363ef1807771ec118',
                label: 'HTTP @SYS',
                data: []
            },
            {
                id: '56c7b06b63ef1807771ec119',
                label: 'HTTPS @ SYS',
                data: []
            }
        ]
    },
    options: {
        maintainAspectRatio: false
    }
};
var mainChart = new Chart(chartContainer, chartOptions);

// Insert a check into the DB
var addCheck = function(form) {
    var url = window.location.origin + '/Checks/create';
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
// Add a line to the checks table
var addCheckLine = function (data) {
    $('#checks>tbody')
        .append(
            '<tr id="'+data.id+'">' +
                '<td class="status"></td><td>'+data.name+'</td>' +
                '<td>'+data.domainNameOrIP+'</td>' +
                '<td>'+data.port+'</td>' +
                '<td class="response-time"></td>' +
                '<td><button class="destroy-check">Delete</button></td>' +
            '</tr>'
        );
};
// Update the table data
var updateCheck = function(check) {
    var target = $('tr#' + check.id);
    target.find('td.status').removeClass('ok nok').addClass(check.open ? 'ok' : 'nok');
    target.find('td.response-time').text(check.duration !== null ? check.duration + 'ms' : 'Timeout');
};

// Deletes a check from the DB
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
// Removes a line from the checks table
var destroyCheckLine = function(data) {
    data.forEach(function(item) {
        $('#checks tr#'+item.id).fadeOut(function() {
            $('#checks tr#'+item.id).remove();
        });
    });
};

var addDataToGraph = function(data) {
    // Push new data into the chart datasets
    for(j = 0; j < chartOptions.data.datasets.length; j++) {
        if (chartOptions.data.datasets[j].id === data.id) {
            chartOptions.data.datasets[j].data.push(data.duration);
        }
    }
};

var processData = function(data) {
    for(i = 0; i < data.length; i++) {
        updateCheck(data[i]);
        addDataToGraph(data[i]);
    }
    // Update the chart
    chartOptions.data.labels.push(moment(data[0].date).format('h:mm:ss'));
    mainChart.update();
};

$(document).ready(function() {

    var socket = io();


    // Actions handling
    $('#check-add').on('submit', function(e) {
        e.preventDefault();
        addCheck($(this));
        $('#check-add')[0].reset();
    });
    $('#checks').on('click', '.destroy-check', function() {
        var idTarget = $(this).closest('tr').attr('id');
        destroyCheck({id: idTarget});
    });

    // Data updating
    socket.on('checksData', function(data) {
        processData(data);
    });

});

