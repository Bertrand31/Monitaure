define(['jquery'], function($) {
    return function(callback) {
        const url = window.location.origin + '/Check/show/';
        $.ajax({
            url: url,
            method: 'GET',
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { callback(null, data); },
            error: function(err) { callback(err, null); }
        });
    };
});
