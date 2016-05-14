define(['jquery'], function($) {
    return function(form, callback) {
        const url = window.location.origin + '/Check/update';
        $.ajax({
            url: url,
            method: form.attr('method'),
            data: form.serialize(),
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { callback(null, data); },
            error: function(err) { callback(err, null); }
        });
    };
});
