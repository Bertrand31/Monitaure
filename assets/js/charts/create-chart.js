define(['jquery', 'chartist', 'moment', 'chartist-plugin-tooltip', '../ajax/get-check-stats', '../utilities/history-to-chart-data'], function($, Chartist, moment, chartistTooltip, getCheckStats, historyToChartData) {
    return function(id, chartOptions) {
        getCheckStats(id, function(err, checkStats) {
            if (err) {
                createPopin('alert', err.responseText);
            } else {
                let lastOutage = '-';
                if (checkStats.lastOutage !== null) {
                    lastOutage = moment(checkStats.lastOutage).format('D/MM/YY H:mm');
                }
                // Process data to output statistics along the chart
                const dataPanel = $('.data');
                dataPanel.find('.name').text(checkStats.name);
                dataPanel.find('.min').text(checkStats.min + 'ms');
                dataPanel.find('.max').text(checkStats.max + 'ms');
                dataPanel.find('.avg').text(checkStats.avg + 'ms');
                dataPanel.find('.availability')
                    .text(checkStats.availability + '%')
                    .attr('data-perfect', checkStats.availability === 100 ? true : false);
                dataPanel.find('.last-outage').text(lastOutage);

                // Show last ping data on top of the chart
                const lastPing = checkStats.history[checkStats.history.length - 1];
                const topDataPanel = $('.top-data');
                topDataPanel.find('.latency-value').text(lastPing.duration);
                topDataPanel.find('.last-check-date').text(moment(lastPing.date).format('HH:mm:ss'));

                // Turn data into chart dataset and create the chart
                historyToChartData(checkStats.history, function(chartData) {
                    const chart = new Chartist.Line('.main-chart', chartData, chartOptions);
                    const seq = 1,
                        delays = 500,
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

                    $('#chart-container').slideDown(300).css('display', 'flex');
                });
            }
        });
    };
});
