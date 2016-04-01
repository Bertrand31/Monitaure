/**********
 * CHART *
 *********/

// Create a chart and show stats for the request row
var createChart = function(id, chartOptions) {
    getCheckStats(id, function(err, checkStats) {
        if (err) {
            createPopin('alert', err.responseText);
        } else {
            var lastOutage = '-';
            if (checkStats.lastOutage !== null) {
                lastOutage = moment(checkStats.lastOutage).format('D/MM/YY H:mm');
            }
            // Process data to output statistics along the chart
            var dataPanel = $('.data');
            dataPanel.find('.name').text(checkStats.name);
            dataPanel.find('.min').text(checkStats.min + 'ms');
            dataPanel.find('.max').text(checkStats.max + 'ms');
            dataPanel.find('.avg').text(checkStats.avg + 'ms');
            dataPanel.find('.availability')
                .text(checkStats.availability + '%')
                .attr('data-perfect', checkStats.availability === 100 ? true : false);
            dataPanel.find('.last-outage').text(lastOutage);

            // Show last ping data on top of the chart
            var lastPing = checkStats.history[checkStats.history.length - 1];
            var topDataPanel = $('.top-data');
            topDataPanel.find('.latency-value').text(lastPing.time);
            topDataPanel.find('.last-check-date').text(moment(lastPing.date).format('HH:mm:ss'));

            // Turn data into chart dataset and create the chart
            historyToChartData(checkStats.history, function(chartData) {
                chart = new Chartist.Line('.main-chart', chartData, chartOptions);
                var seq = 0,
                    delays = 80,
                    durations = 500;

                chart.on('draw', function(data) {
                    if (data.type === 'area') {
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
        }
    });
};
