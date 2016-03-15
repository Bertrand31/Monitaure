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

var createPopin = function(type, message) {
    var html = '<div data-type="' + type + '" class="pop-in">' +
                    '<p class="content">' + message + '</p>' +
                    '<div class="close-popin"></div>' +
                '</div>';
    $('body').append(html);
    $('.close-popin').click(function() {
        $(this).parent('.pop-in').remove();
    });
};
