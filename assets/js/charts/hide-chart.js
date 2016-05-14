define(['jquery'], function($) {
    return function(callback) {
        currentChartId = null;
        $('#chart-container').slideUp(300, function() {
            callback();
        });
    };
});
