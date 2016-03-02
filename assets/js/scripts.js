/**************************
 * GENERAL DATA HANDLING *
 **************************/
// Update the table data
var updateCheck = function(check) {
    var target = $('tr#' + check.id);
    target.find('td.status').attr('data-health', check.open ? 'ok' : 'nok');
    target.find('td.response-time')
        .text(check.duration !== null ? check.duration + 'ms' : '-')
        .attr('data-speed', check.duration>200 ? 'slow' : 'fast');
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
            '<td class="status"></td>' +
            '<td>'+data.name+'</td>' +
            '<td>'+data.domainNameOrIP+'</td>' +
            '<td>'+data.port+'</td>' +
            '<td class="response-time"></td>' +
            '<td class="settings"><button class="settings-check"></button></td>' +
            '<td class="destroy"><button class="destroy-check"></button></td>' +
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
// Create a chart and show stats for the request row
var createChart = function(id, chartOptions) {
    getCheck(id, function(check) {

        // Process data to output statistics along the chart
        historyStats(check[0].history, function(min, max, avg, availability, lastError) {
            $('.data').find('.name').text(check[0].name);
            $('.data').find('.min').text(min + 'ms');
            $('.data').find('.max').text(max + 'ms');
            $('.data').find('.avg').text(avg + 'ms');
            $('.data').find('.availability')
                .text(availability + '%')
                .attr('data-perfect', availability == 100 ? true : false);
            $('.data').find('.last-error').text(lastError);
        });

        // Turn data into chart dataset and create the chart
        historyToChartData(check[0].history, function(chartData) {
            chart = new Chartist.Line('.main-chart', chartData, chartOptions);
            $('#chart-container').fadeIn().css('display', 'flex');
        });


    });
};
// Add new data to existing chart
var addDataToChart = function(data) {
    // console.log(data);
    // chart.update();
};


/**************
 * UTILITIES *
***************/
var historyToChartData = function(history, callback) {
    var chartData = {
        labels: [],
        series: [
            []
        ]
    };
    for (i=0; i<history.length; i++) {
        var fancyDate = moment(history[i].date).fromNow();
        var lightDate = moment(history[i].date).format('H:mm');
        chartData.labels.push(lightDate);
        chartData.series[0].push({
            meta: fancyDate,
            value: history[i].time
        });
    }
    callback(chartData);
};
var historyStats = function(dataArray, callback) {
    var sum = 0,
        min = dataArray[0].time,
        max = dataArray[0].time,
        avg = 0,
        errors = 0,
        lastError = '';

    for (i=0; i<dataArray.length; i++) {
        if (dataArray[i].time === null) {
            errors++;
            lastError = dataArray[i].date;
        } else {
            sum += dataArray[i].time;
            min = dataArray[i].time < min ? dataArray[i].time : min;
            max = dataArray[i].time > max ? dataArray[i].time : max;
        }
    }
    avg = Math.round(sum / dataArray.length);
    var availability = 100 - (errors * 100) / dataArray.length;
    lastError = lastError !== '' ? moment(lastError).format('D/MM/YY H:mm') : '-';

    callback(min, max, avg, availability, lastError);
};

/*************************
 * MAIN FRONT FUNCTIONS *
*************************/
var openFullscreen = function(target) {
    $('#main-container').addClass('blurred');
    target.fadeIn().css('display', 'flex');
    target.find('.close-fullscreen').click(function() {
        closeFullscreen(target);
    });
};
var closeFullscreen = function(target) {
    $('#main-container').removeClass('blurred');
    target.fadeOut('slow', function() {
        target.find('form')[0].reset();
    });
};

/*********************
 * MAIN CONTROLLERS *
*********************/
var currentChartId = '',
    chart;

$(document).ready(function() {

    var socket = io();

    // Update table data on 'checksData' event
    socket.on('checksData', function(data) {
        processData(data);
    });

    // 'Add a check' form actions
    $('#open-form').click(function() {
        openFullscreen($('#check-add-form'));
    });
    $('#check-add').on('submit', function(e) {
        e.preventDefault();
        addCheckLine($(this));
        closeFullscreen($(this).parent('.fullscreen-wrapper'));
    });

    // Table actions
    $('#checks').on('click', '.destroy-check', function(e) {
        e.stopPropagation();
        var id = $(this).closest('tr').attr('id');
        destroyCheckRow(id);
    });
    $('#checks tbody').on('click', 'tr', function() {
        var id = $(this).attr('id');
        currentChartId = id;
        var chartOptions = {
            fullWidth: false,
            showArea: true,
            low: 0,
            height: 250,
            onlyInteger: true,
            axisY: {
                showLabel: false,
                showGrid: false
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };
        createChart(id, chartOptions);
    });

});
