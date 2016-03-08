/**********
 * TABLE *
 **********/

// UPDATING DATA
// Update the table data
var updateTableRow = function(ping) {
    var target = $('tr#' + ping.checkId);
    target.find('td.status').attr('data-health', ping.open ? 'ok' : 'nok');
    target.find('td.response-time')
        .text(ping.duration !== null ? ping.duration + 'ms' : '-')
        .attr('data-speed', ping.duration>200 ? 'slow' : 'fast');
};
// Trigger updateTableRow for each table row
var processData = function(data) {
    for(i = 0; i < data.length; i++) {
        updateTableRow(data[i]);
        // if (data[i].id === currentChartId) {
        //     addDataToChart(data[i]);
        // }

    }
};

// ADDING AND REMOVING CHECKS
// Add a line to the checks table
var addCheckLine = function (form) {
    addCheck(form, function(data) {
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
    });
};
// Removes a row from the checks table
var destroyCheckRow = function(id) {
    destroyCheck(id, function(data) {
        data.forEach(function(item) {
            $('#checks tr#'+item.id).fadeOut(function() {
                $('#checks tr#'+item.id).remove();
            });
        });
    });
};
