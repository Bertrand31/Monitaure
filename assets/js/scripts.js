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
var addCheckLine = function (data) {
    $('#checks>tbody').append('<tr id="'+data.id+'"><td class="status"></td><td>'+data.name+'</td><td>'+data.domainNameOrIP+'</td><td>'+data.port+'</td><td class="response-time"></td><td><button class="destroy-check">Delete</button></td></tr>');
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
        $('#checks tr#'+item.id).fadeOut(function() {
            $('#checks tr#'+item.id).remove();
        });
    });
};

$(document).ready(function() {

    var socket = io();

    var chartContainer = $('#mainChart');
	var mainChartOptions = {
		type: 'line',
        data: {
            labels: [],
			datasets: [{
				label: 'HTTP @ SYS',
				data: []
            }]
        }
	};
    var mainChart = new Chart(chartContainer, mainChartOptions);

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

        for(i = 0; i < data.length; i++) {
            // Update the table
            var target = $('tr#' + data[i].id);
            target.find('td.response-time').text(data[i].duration + 'ms');
            target.find('td.status').removeClass().addClass(data[i].open ? 'ok' : 'nok');
        }

        var activeCheck = '56c766659b5e10b71efaf330';
        // Update the chart
        mainChartOptions.data.labels.push(moment(data[0].date).format('h:mm:ss'));
        mainChartOptions.data.datasets[0].data.push(data[0].duration);
        mainChart.update();

    });
});

