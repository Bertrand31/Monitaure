/***********************
 * FULLSCREEN POP-INS *
***********************/

var openFullscreen = function(target) {
    $('#main-container').addClass('blurred');
    target.fadeIn().css('display', 'flex');
    target.find('.close-fullscreen').click(function() {
        closeFullscreen(target);
    });
};
var closeFullscreen = function(target) {
    $('#main-container').removeClass('blurred');
    target.fadeOut('slow', function() {
        target.find('form')[0].reset();
    });
};

