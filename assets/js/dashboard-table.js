/**********
 * TABLE *
 **********/

var updateGlobalStats = function (data) {
    var globalWrapper = $('.global-data');
    globalWrapper.find('.checks-down').text(data.checksDown);
    globalWrapper.find('.total-checks').text(data.numberOfChecks);
    globalWrapper.find('.availabilities-avg').text(data.availabilitiesAvg);
    globalWrapper.find('.last-error--check-name').text(data.lastError.checkName);
    globalWrapper.find('.last-error--time').text(data.lastError.time);
};
// Update table data
var updateTableRows = function (data) {
    var lastHistory = null,
        table = $('#checks'),
        target = null;

    for (var i = 0; i < data.length; i++) {
        lastHistory = data[i].history[0];
        target = table.find('tr#' + data[i].id);
        target.find('td.status').attr('data-health', lastHistory.time ? 'ok' : 'nok');
        target.find('td.response-time')
            .text(data[i].time !== null ? lastHistory.time + 'ms' : '-')
            .attr('data-speed', lastHistory.time > 200 ? 'slow' : 'fast');
    }
};
// Trigger updateTableRow for each table row
var processData = function(data) {
    updateGlobalStats(data.globalStats);
    updateTableRows(data.userData.checks);
};

// ADDING AND REMOVING CHECKS
// Add a line to the checks table
var addCheckLine = function (form) {
    addCheck(form, function(err, data) {
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
};
// Update an existing check
var updateCheckLine = function (form) {
    updateCheck(form, function(err, data) {
        if (err) {
            createPopin('alert', err);
        } else {
            $('#checks').find('tr#' + data.id + ' .name').text(data.name);
        }
    });
};
// Removes a row from the checks table
var destroyCheckRow = function(id) {
    destroyCheck(id, function(err, item) {
        if (err) {
            createPopin('alert', err);
        } else {
            $('#checks tr#'+item.id).fadeOut(function() {
                $('#checks tr#'+item.id).remove();
            });
        }
    });
};
