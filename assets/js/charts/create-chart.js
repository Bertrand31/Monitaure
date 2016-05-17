//MISC
        let currentChartId = null;

        $(document).ready(function() {

            const chartOptions = {
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
                    chartistTooltip()
                ]
            };

            // Automatic data pulling and udpating
            const updateInterval = 1 * 60 * 1000; // 1mn
            setInterval(function() {
                getAllStats(function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {

                        store.tableData.data = data.userData.checks;
                        store.tableData.render();
                        store.globalStats.data = data.globalStats;
                        store.globalStats.render();

                        const globalWrapper = $('.global-data');
                        globalWrapper.find('.last-error--check-name').text(data.globalStats.lastError.checkName);
                        globalWrapper.find('.last-error--time').text(data.globalStats.lastError.duration);

                        // updateTableRows(data.userData.checks);
                        if (currentChartId !== null) {
                            createChart(currentChartId, chartOptions);
                        }
                    }
                });
                getGlobalStats(function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        createGlobalStats(data.globalStats);
                    }
                });
            }, updateInterval);

            // Users management
            $('#signup').on('submit', function(e) {
                e.preventDefault();
                createUser($(this), function(err, user) {
                    if (err) {
                        let errorMsg = '';
                        if (err.responseJSON.hasOwnProperty('invalidAttributes')) {
                            const invalidAttrs = err.responseJSON.invalidAttributes;
                            for (let invalidAttr in invalidAttrs) {
                                if (invalidAttrs.hasOwnProperty(invalidAttr)) {
                                    errorMsg = $('#signup #'+invalidAttr).attr('data-error');
                                }
                            }
                        } else if (err.responseText === 'passwords-mismatch') {
                            errorMsg = $('#signup #confirmPassword').attr('data-error');
                        } else {
                            errorMsg = err.statusText;
                        }
                        createPopin('alert', errorMsg);
                    } else {
                        $('.signup-block').slideUp();
                        $('.confirmation-block>p').text('A confirmation email has just been sent to ' + user.email + '.').slideDown();
                    }
                });
            });

            // 'Add a check' form actions
            $('#open-form').click(function() {
                openFullscreen($('#check-add-form'));
            });
            $('#check-add').on('submit', function(e) {
                e.preventDefault();
                addCheck($(this), function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                    }
                });
                closeFullscreen($('.fullscreen-wrapper#check-add-form'));
            });
            // Check update form
            $('#check-update').on('submit', function(e) {
                e.preventDefault();
                updateCheck($(this), function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        $('#checks').find('tr#' + data.id + ' .name').text(data.name);
                    }
                });
                closeFullscreen($('.fullscreen-wrapper#check-update-form'));
            });
            $('.fullscreen-wrapper').click(function() {
                closeFullscreen($(this));
            });
            $('.fullscreen-wrapper').find('.centered-box').click(function(e) {
                e.stopPropagation();
            });

            // globalStats is declared inline, in the Jade template
            createGlobalStats(globalStats);

            // CLICK ON A TABLE ROW
            $('#checks-table-wrapper').on('click', 'tbody>tr', function() {
                const currentLine = $(this);
                const id = currentLine.attr('id');
                if (id === currentChartId) {
                    hideChart(function() {
                        currentChartId = null;
                        currentLine.removeClass('active');
                    });
                } else {
                    hideChart(function() {
                        createChart(id, chartOptions);
                        currentChartId = id;
                        currentLine.siblings('.active').removeClass('active');
                        currentLine.addClass('active');
                    });
                }
            });
        });
define(['jquery', 'chartist', 'moment', 'chartist-plugin-tooltip'], function($, Chartist, moment, chartistTooltip) {
    const historyToChartData = function(history, callback) {
        const chartData = {
            labels: [],
            series: [
                []
            ]
        };
        for (let i=0; i<history.length; i++) {
            const fancyDate = moment(history[i].date).fromNow();
            const lightDate = moment(history[i].date).format('H:mm');
            chartData.labels.push(lightDate);
            chartData.series[0].push({
                meta: fancyDate,
                value: history[i].duration
            });
        }
        return callback(chartData);
    };
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
