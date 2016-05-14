define(['jquery'], function($) {
    return function(target) {
        target.fadeOut(function() {
            target.find('form')[0].reset();
        });
        $('#main-container').removeClass('blurred');
    };
});
