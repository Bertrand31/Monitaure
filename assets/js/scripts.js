/**************************
 * GENERAL DATA HANDLING *
 **************************/
// Update the table data
var updateTableRow = function(ping) {
    var target = $('tr#' + ping.checkId);
    target.find('td.status').attr('data-health', ping.open ? 'ok' : 'nok');
    target.find('td.response-time')
        .text(ping.duration !== null ? ping.duration + 'ms' : '-')
        .attr('data-speed', ping.duration>200 ? 'slow' : 'fast');
};
// Trigger updateTableRow for each table row
var processData = function(data) {
    for(i = 0; i < data.length; i++) {
        updateTableRow(data[i]);
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
// Get a check statistics
var getCheckStats = function(id, callback) {
    var url = window.location.origin + '/Checks/getstats/'+id;
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
    getCheckStats(id, function(checkStats) {

        var lastOutage = moment(checkStats.lastOutage).format('D/MM/YY H:mm');
        // Process data to output statistics along the chart
        $('.data').find('.name').text(checkStats.name);
        $('.data').find('.min').text(checkStats.min + 'ms');
        $('.data').find('.max').text(checkStats.max + 'ms');
        $('.data').find('.avg').text(checkStats.avg + 'ms');
        $('.data').find('.availability')
            .text(checkStats.availability + '%')
            .attr('data-perfect', checkStats.availability == 100 ? true : false);
        $('.data').find('.last-outage').text(lastOutage);

        // Show last ping data on top of the chart
        var lastPing = checkStats.history[checkStats.history.length - 1];
        $('.top-data').find('.latency-value').text(lastPing.time);
        $('.top-data').find('.last-check-date').text(moment(lastPing.date).format('HH:mm:ss'));

        // Turn data into chart dataset and create the chart
        historyToChartData(checkStats.history, function(chartData) {
            chart = new Chartist.Line('.main-chart', chartData, chartOptions);
            var seq = 0,
                delays = 80,
                durations = 500;

            chart.on('draw', function(data) {
                if (data.type === 'area') {
                    // console.log(data);
                    // data.element.attr({
                    //     // fill: 'url(#GreenGradient)'
                    // });
                    data.element.animate({
                        opacity: {
                            begin: seq * delays + 400,
                            dur: durations,
                            from: 0,
                            to: 1
                        }
                    });
                } else if (data.type === 'point' ) {
                    data.element.animate({
                        opacity: {
                            begin: seq * delays + 400,
                            dur: durations,
                            from: 0,
                            to: 1
                        },
						y1: {
							begin: seq * delays + 400,
							dur: durations,
							from: data.y + 100,
							to: data.y,
							easing: 'easeOutQuart'
						},
						y2: {
							begin: seq * delays + 400,
							dur: durations,
							from: data.y + 160,
							to: data.y,
							easing: 'easeOutQuart'
						}
                    });
                } else if (data.type === 'line' ) {
                    data.element.animate({
                        opacity: {
                            begin: seq * delays + 200,
                            dur: durations,
                            from: 0,
                            to: 1
                        }
                    });
                }

            });

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

    // Update table data on 'pings' event
    socket.on('pings', function(data) {
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
                // showLabel: false,
                offset: 50,
                showGrid: false,
                scaleMinSpace: 100,
                labelInterpolationFnc: function(value) {
                    return value + 'ms';
                }
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };
        createChart(id, chartOptions);
    });

});
