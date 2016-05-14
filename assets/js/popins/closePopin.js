define(['jquery'], function($) {
    return function(target) {
        target.fadeTo('slow', 0, function() {
            $(this).slideUp('fast', function() {
                $(this).remove();
            });
        });
    };
});
