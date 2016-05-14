define(['jquery'], function($) {
    return function(checkId, callback) {
        const url = window.location.origin + '/Check/getcheckstats/'+checkId;
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
