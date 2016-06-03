define([], function() {
    return {
        // Users management
        createUser: function(ajaxPost, form, callback) {
            const url = window.location.origin + '/User/create/';
            ajaxPost(url, form.serialize(), function(err, data) {
                return callback(err, data);
            });
        },
        // Checks management
        createCheck: function(ajaxPost, form, callback) {
            const url = window.location.origin + '/Check/create';
            ajaxPost(url, form.serialize(), function(err, data) {
                return callback(err, data);
            });
        },
        updateCheck: function(ajaxPost, data, callback) {
            const url = window.location.origin + '/Check/update';
            ajaxPost(url, data, function(err, data) {
                return callback(err, data);
            });
        },
        destroyCheck: function(ajaxGet, checkId, callback) {
            const url = window.location.origin + '/Check/destroy';
            ajaxGet(url, { checkId }, function(err, data) {
                return callback(err, data);
            });
        },
        // Check's data fetching
        showCheckSimple: function(ajaxGet, checkId, callback) {
            const url = window.location.origin + '/Check/showsimple/'+checkId;
            ajaxGet(url, { checkId }, function(err, data) {
                return callback(err, data);
            });
        },
        getAllStats: function(ajaxGet, callback) {
            const url = window.location.origin + '/Check/show/';
            ajaxGet(url, null, function(err, data) {
                return callback(err, data);
            });
        },
        getCheckStats: function(ajaxGet, checkId, callback) {
            const url = window.location.origin + '/Check/getcheckstats/'+checkId;
            ajaxGet(url, { checkId }, function(err, data) {
                return callback(err, data);
            });
        }
    };
});
