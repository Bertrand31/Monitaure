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
    var percentageOfChecksUp = (globalStats.checksUp * 100) / globalStats.numberOfChecks;
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
    var lastErrorHour = moment(globalStats.lastError.time).format('HH:SS');
    var lastErrorDay = moment(globalStats.lastError.time).format('MM/DD');
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
        var checkId = $(this).closest('tr').attr('id');
        destroyCheckRow(checkId);
    });
    $('#checks tbody').on('click', '.settings-check', function(e) {
        e.stopPropagation();
        var checkId = $(this).closest('tr').attr('id');
        openFullscreen($('#check-update-form'));
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
