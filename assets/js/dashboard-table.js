/**********
 * TABLE *
 **********/

const updateGlobalStats = function (data) {
    const globalWrapper = $('.global-data');
    globalWrapper.find('.checks-up').text(data.checksUp);
    globalWrapper.find('.total-checks').text(data.numberOfChecks);
    globalWrapper.find('.availabilities-avg').text(data.availabilitiesAvg);
    globalWrapper.find('.last-error--check-name').text(data.lastError.checkName);
    globalWrapper.find('.last-error--time').text(data.lastError.time);
};
// Update table data
const updateTableRows = function (data) {
    var lastHistory = null,
        target = null;
    const table = $('#checks');

    for (var i = 0; i < data.length; i++) {
        lastHistory = data[i].history[0];
        target = table.find('tr#' + data[i].id);
        target.find('td.status').attr('data-health', lastHistory.time ? 'up' : 'down');
        target.find('td.response-time')
            .text(lastHistory.time !== null ? lastHistory.time + 'ms' : '-')
            .attr('data-speed', lastHistory.time > 200 ? 'slow' : 'fast');
    }
};
// Trigger updateTableRow for each table row
const processData = function(data) {
    updateGlobalStats(data.globalStats);
    updateTableRows(data.userData.checks);
};
