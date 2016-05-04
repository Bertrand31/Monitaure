/**********
 * TABLE *
 **********/

var updateGlobalStats = function (data) {
    const globalWrapper = $('.global-data');
    globalWrapper.find('.checks-down').text(data.checksDown);
    globalWrapper.find('.total-checks').text(data.numberOfChecks);
    globalWrapper.find('.availabilities-avg').text(data.availabilitiesAvg);
    globalWrapper.find('.last-error--check-name').text(data.lastError.checkName);
    globalWrapper.find('.last-error--time').text(data.lastError.time);
};
// Update table data
var updateTableRows = function (data) {
    var lastHistory = null,
        target = null;
    const table = $('#checks');

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
