define(['jquery'], function($) {
    return function(target) {
        $('#main-container').addClass('blurred');
        target.fadeIn().css('display', 'flex');
        target.find('.close-fullscreen').click(function() {
            closeFullscreen(target);
        });
    };
});
