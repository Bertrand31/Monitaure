define([], function() {
    return {
        // Users management
        createUser: function(ajaxPost, form, callback) {
            const url = `${window.location.origin}/User/create/`;
            ajaxPost(url, form.serialize(), function(err, resJSON) {
                return callback(err, resJSON);
            });
        },
        // Checks management
        createCheck: function(ajaxPost, data, callback) {
            const url = `${window.location.origin}/Check/create`;
            ajaxPost(url, data, function(err, resJSON) {
                return callback(err, resJSON);
            });
        },
        updateCheck: function(ajaxPost, data, callback) {
            const url = `${window.location.origin}/Check/update`;
            ajaxPost(url, data, function(err, resJSON) {
                return callback(err, resJSON);
            });
        },
        destroyCheck: function(ajaxGet, checkId, callback) {
            const url = `${window.location.origin}/Check/destroy`;
            ajaxGet(url, { checkId }, function(err, resJSON) {
                return callback(err, resJSON);
            });
        },
        getUserAndGlobalStats: function(ajaxGet, callback) {
            const url = `${window.location.origin}/Check/getuserandglobalstats/`;
            ajaxGet(url, null, function(err, resJSON) {
                return callback(err, resJSON);
            });
        },
        getCheckStats: function(ajaxGet, checkId, callback) {
            const url = `${window.location.origin}/Check/getcheckstats/${checkId}`;
            ajaxGet(url, { checkId }, function(err, resJSON) {
                return callback(err, resJSON);
            });
        }
    };
});
