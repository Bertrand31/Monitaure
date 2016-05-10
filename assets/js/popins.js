/***********************
 * FULLSCREEN POP-INS *
***********************/

const closeFullscreen = function(target) {
    target.fadeOut(function() {
        target.find('form')[0].reset();
    });
    $('#main-container').removeClass('blurred');
};
const openFullscreen = function(target) {
    $('#main-container').addClass('blurred');
    target.fadeIn().css('display', 'flex');
    target.find('.close-fullscreen').click(function() {
        closeFullscreen(target);
    });
};

const closePopin = function(target) {
    target.fadeTo('slow', 0, function() {
        $(this).slideUp('fast', function() {
            $(this).remove();
        });
    });
};
const createPopin = function(type, message) {
    const html = '<div data-type="' + type + '" class="pop-in">' +
                    '<p class="content">'  + message + '</p>' +
                    '<div class="close-popin"></div>' +
                '</div>';
    const popin = $(html).appendTo('.popins-container');
    popin.find('.close-popin').click(function() {
        closePopin(popin);
    });
    setTimeout(function() {
        closePopin(popin);
    }, 5000);
};
