/***********************
 * FULLSCREEN POP-INS *
***********************/

var closeFullscreen = function(target) {
    target.fadeOut(function() {
        target.find('form')[0].reset();
    });
    $('#main-container').removeClass('blurred');
};
var openFullscreen = function(target) {
    $('#main-container').addClass('blurred');
    target.fadeIn().css('display', 'flex');
    target.find('.close-fullscreen').click(function() {
        closeFullscreen(target);
    });
};

var closePopin = function(target) {
    target.fadeTo('slow', 0, function() {
        $(this).slideUp('fast', function() {
            $(this).remove();
        });
    });
};
var createPopin = function(type, message) {
    var html = '<div data-type="' + type + '" class="pop-in">' +
                    '<p class="content">' + message + '</p>' +
                    '<div class="close-popin"></div>' +
                '</div>';
    var popin = $(html).appendTo('.popins-container');
    popin.find('.close-popin').click(function() {
        closePopin(popin);
    });
    setTimeout(function() {
        closePopin(popin);
    }, 5000);
};
