/*********************
 * MAIN CONTROLLERS *
*********************/
$(document).ready(function() {

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

    // Interval between each data update (5mn)
    var updateInterval = 5  * 60 * 1000;
    // Update table data
    setInterval(function() {
        getAllStats(function(err, data) {
            if (err) {
                createPopin('alert', err);
            } else {
                processData(data);
            }
        });
    }, updateInterval);

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
    $('#checks tbody').on('click', '.destroy-check', function(e) {
        e.stopPropagation();
        var id = $(this).closest('tr').attr('id');
        destroyCheckRow(id);
    });
    $('#checks').on('click', 'tr', function() {
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
