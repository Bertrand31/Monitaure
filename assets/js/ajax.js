/*********
 * AJAX *
*********/

// Insert a check into the DB
const addCheck = function(form, callback) {
    const url = window.location.origin + '/Check/create';
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
// Updates an existing check
const updateCheck = function(form, callback) {
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
// Show minimal check data
const showSimple = function(checkId, callback) {
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
// Deletes a check from the DB
const destroyCheck = function(checkId, callback) {
    const url = window.location.origin + '/Check/destroy';
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
// Get globalStats
const getGlobalStats = function(callback) {
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
// Get user's global stats and checks
const getAllStats = function(callback) {
    const url = window.location.origin + '/Check/getallstats/';
    $.ajax({
        url: url,
        method: 'GET',
        beforeSend: function() {},
        complete: function() {},
        success: function(data) { callback(null, data); },
        error: function(err) { callback(err, null); }
    });
};
// Get a check statistics
const getCheckStats = function(checkId, callback) {
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
// Create user
const createUser = function(form, callback) {
    const url = window.location.origin + '/User/create/';
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
