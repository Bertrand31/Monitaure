define(['jquery'], function($) {
    return function(callback) {
        $('#chart-container').slideUp(300, function() {
            callback();
        });
    };
});
