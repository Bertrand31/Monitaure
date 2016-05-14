define(['jquery'], function($) {
    return function(data) {
        var lastHistory = null,
            target = null;
        const table = $('#checks');

        for (var i = 0; i < data.length; i++) {
            lastHistory = data[i].history[0];
            target = table.find('tr#' + data[i].id);
            target.find('td.status').attr('data-health', lastHistory.duration ? 'up' : 'down');
            target.find('td.response-time')
                .text(lastHistory.duration !== null ? lastHistory.duration + 'ms' : '-')
                .attr('data-speed', lastHistory.duration > 200 ? 'slow' : 'fast');
        }
    };
});
