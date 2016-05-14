require(
    ['jquery', 'moment', 'chartist', 'chartist-plugin-tooltip',
    './charts/create-chart', './charts/create-global-stats', './charts/hide-chart',
    './popins/openFullscreen', './popins/closeFullscreen', './popins/createPopin', './popins/closePopin',
    './dashboard-table/update-global-stats', './dashboard-table/update-table-rows',
    './ajax/add-check', './ajax/create-user', './ajax/destroy-check', './ajax/get-all-stats', './ajax/get-global-stats', './ajax/show-simple', './ajax/update-check'],
    function($, moment, Chartist, chartistTooltip,
        createChart, createGlobalStats, hideChart,
        openFullscreen, closeFullscreen, createPopin, closePopin,
        updateGlobalStats, updateTableRows,
        addCheck, createUser, destroyCheck, getAllStats, getGlobalStats, showSimple, updateCheck) {

        var currentChartId = null;

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
                        updateGlobalStats(data.globalStats);
                        updateTableRows(data.userData.checks);
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
                        var errorMsg = '';
                        if (err.responseJSON.hasOwnProperty('invalidAttributes')) {
                            const invalidAttrs = err.responseJSON.invalidAttributes;
                            for (var invalidAttr in invalidAttrs) {
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
                        $('#checks>tbody').append(
                            '<tr id="' + data.id + '">' +
                                '<td class="status" data-health="waiting"></td>' +
                                '<td>' + data.name + '</td>' +
                                '<td>' + data.domainNameOrIP + '</td>' +
                                '<td>' + data.port + '</td>' +
                                '<td class="response-time">-</td>' +
                                '<td class="settings"><button class="settings-check"></button></td>' +
                                '<td class="destroy"><button class="destroy-check"></button></td>' +
                            '</tr>'
                        );
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

            // Table actions
            const tableBody = $('#checks tbody');
            tableBody.on('click', '.destroy-check', function(e) {
                e.stopPropagation();
                const checkId = $(this).closest('tr').attr('id');
                destroyCheck(checkId, function(err, item) {
                    if (err) {
                        createPopin('alert', err);
                    } else {
                        $('#checks tr#'+item.id).fadeOut(function() {
                            $('#checks tr#'+item.id).remove();
                        });
                        if (checkId === currentChartId) {
                            hideChart(function() {
                                currentChartId = null;
                            });
                        }
                    }
                });
            });
            tableBody.on('click', '.settings-check', function(e) {
                e.stopPropagation();
                const checkId = $(this).closest('tr').attr('id');
                const form = $('#check-update-form').find('form#check-update');
                showSimple(checkId, function(err, data) {
                    if (err) {
                        createPopin('alert', err.responseText);
                    } else {
                        form.find('#update-checkId').attr('value', checkId);
                        form.find('#update-name').attr('value', data.name);
                        form.find('#update-domainNameOrIP').attr('value', data.domainNameOrIP);
                        form.find('#update-port').attr('value', data.port);
                        if (data.emailNotifications)
                            form.find('#update-emailNotifications').prop('checked', true);
                        else
                            form.find('#update-emailNotifications').prop('checked', false);
                    }
                });
                openFullscreen($('#check-update-form'));
            });

            // CLICK ON A TABLE ROW
            // Chart handling
            $('#checks').on('click', 'tbody>tr', function() {
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
});
