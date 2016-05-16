require(['jquery', './closePopin.js'], function($, closePopin) {
    return function(type, message) {
        const html = `<div data-type="${type}" class="pop-in">
                        <p class="content">${message}</p>
                        <div class="close-popin"></div>
                    </div>`;
        const popin = $(html).appendTo('.popins-container');
        popin.find('.close-popin').click(function() {
            closePopin(popin);
        });
        setTimeout(function() {
            closePopin(popin);
        }, 5000);
    };
});
