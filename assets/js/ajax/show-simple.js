define(['jquery'], function($) {
    return function(checkId, callback) {
        const url = window.location.origin + '/Check/showsimple/'+checkId;
        $.ajax({
            url: url,
            method: 'GET',
            data: { checkId: checkId },
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { callback(null, data); },
            error: function(err) { callback(err, null); }
        });
    };
});
