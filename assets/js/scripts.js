/*********************
 * MAIN CONTROLLERS *
*********************/

var currentChartId;

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
            Chartist.plugins.tooltip()
        ]
    };

    // Automatic data pulling and udpate
    const updateInterval = 2 * 60 * 1000; // 2mn
    // Every `updateInterval`, we pull updated data and send it to processData
    setInterval(function() {
        getAllStats(function(err, data) {
            if (err) {
                createPopin('alert', err.responseJSON);
            } else {
                processData(data);
                createChart(currentChartId, chartOptions);
            }
        });
    }, updateInterval);

    // Users management
    $('#signup').on('submit', function(e) {
        e.preventDefault();
        createUser($(this), function(err, data) {
            if (err) {
                var errorMsg = '';
                if (err.responseJSON.hasOwnProperty('invalidAttributes')) {
                    var invalidAttrs = err.responseJSON.invalidAttributes;
                    for (var invalidAttr in invalidAttrs) {
                        if (invalidAttrs.hasOwnProperty(invalidAttr)) {
                            errorMsg = $('#signup #'+invalidAttr).attr('data-error');
                        }
                    }
                } else if (err.responseJSON === 'passwords-mismatch') {
                    errorMsg = $('#signup #confirmPassword').attr('data-error');
                } else {
                    errorMsg = err.statusText;
                }
                createPopin('alert', errorMsg);
            } else {
                createPopin('info', 'User ' + data.user.email + ' successfully created');
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
            }
        });
        closeFullscreen($('.fullscreen-wrapper#check-add-form'));
    });
    // Check update form
    $('#check-update').on('submit', function(e) {
        e.preventDefault();
        updateCheck($(this), function(err, data) {
            if (err) {
                createPopin('alert', err);
            } else {
                $('#checks').find('tr#' + data.id + ' .name').text(data.name);
            }
        });
        closeFullscreen($('.fullscreen-wrapper#check-update-form'));
    });
    $('.fullscreen-wrapper').click(function() {
        closeFullscreen($(this));
    });
    $('.form-wrapper').click(function(e) {
        e.stopPropagation();
    });

    // Global stats
    var donutOptions = {
        width: '200px',
        height: '200px',
        donut: true,
        donutWidth: 5,
        startAngle: 230,
        total: 140,
        showLabel: false
    };
    // globalStats is declared inline, in the Jade template
    var percentageOfChecksUp = (globalStats.checksUp * 100) / globalStats.numberOfChecks;
    new Chartist.Pie('.checks-up-donut',
        {
            series: [
                {
                    value: percentageOfChecksUp,
                    className: 'primary-bar'
                },
                {
                    value: 100 - percentageOfChecksUp,
                    classname: 'secondary-bar'
                }
            ]
        },
        donutOptions
    );
    new Chartist.Pie('.availability-donut', {
        series: [
            {
                value: globalStats.availabilitiesAvg,
                className: 'primary-bar'
            },
            {
                value: 100 - globalStats.availabilitiesAvg,
                className: 'secondary-bar'
            }
        ]},
        donutOptions
    );
    var lastErrorHour = globalStats.lastError.time ? moment(globalStats.lastError.time).format('HH:SS') : '-';
    var lastErrorDay = globalStats.lastError.time ? moment(globalStats.lastError.time).format('MM/DD') : '-';
    $('.last-error--hour').text(lastErrorHour);
    $('.last-error--day').text(lastErrorDay);
    new Chartist.Pie('.last-error-donut', {
            series: [
                {
                    value: 100,
                    className: 'primary-bar--nok'
                }
            ]
        },
        donutOptions
    );

    // Table actions
    var tableBody = $('#checks tbody');
    tableBody.on('click', '.destroy-check', function(e) {
        e.stopPropagation();
        var checkId = $(this).closest('tr').attr('id');
        destroyCheck(checkId, function(err, item) {
            if (err) {
                createPopin('alert', err);
            } else {
                $('#checks tr#'+item.id).fadeOut(function() {
                    $('#checks tr#'+item.id).remove();
                });
                if (checkId == currentChartId) {
                    hideChart();
                }
            }
        });
    });
    tableBody.on('click', '.settings-check', function(e) {
        e.stopPropagation();
        var checkId = $(this).closest('tr').attr('id');
        var form = $('#check-update-form').find('form#check-update');
        showSimple(checkId, function(err, data) {
            if (err) {
                createPopin('alert', err.responseJSON);
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
        var currentLine = $(this);
        var id = currentLine.attr('id');
        if (id === currentChartId) {
            hideChart(function() {
                currentLine.siblings('.active').removeClass('active');
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
