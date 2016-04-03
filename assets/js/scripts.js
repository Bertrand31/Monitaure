/*********************
 * MAIN CONTROLLERS *
*********************/

$(document).ready(function() {

    // Automatic data pulling and udpate
    var updateInterval = 5 * 60 * 1000; // 5mn
    // Every `updateInterval`, we pull updated data and send it to processData
    setInterval(function() {
        getAllStats(function(err, data) {
            if (err) {
                createPopin('alert', err.responseJSON);
            } else {
                processData(data);
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
        addCheckLine($(this));
        closeFullscreen($('.fullscreen-wrapper'));
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
    var totalChecks = $('.total-checks').text();
    var percentageOfChecksUp = ($('.checks-up').text() * 100) / totalChecks;
    new Chartist.Pie('.checks-up-donut', {
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
    var availabilitiesAvg = $('.availabilities-avg').text();
    new Chartist.Pie('.availability-donut', {
        series: [
            {
                value: availabilitiesAvg,
                className: 'primary-bar'
            },
            {
                value: 100 - availabilitiesAvg,
                className: 'secondary-bar'
            }
        ]},
        donutOptions
    );
    var lastErrorTime = $('.last-error--time').text();
    var lastErrorHour = moment(lastErrorTime).format('HH:SS');
    var lastErrorDay = moment(lastErrorTime).format('MM/DD');
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
    $('#checks tbody').on('click', '.destroy-check', function(e) {
        e.stopPropagation();
        var id = $(this).closest('tr').attr('id');
        destroyCheckRow(id);
    });
    $('#checks').on('click', 'tbody>tr', function() {
        var id = $(this).attr('id');
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
