/*********
 * AJAX *
*********/

// Insert a check into the DB
var addCheck = function(form, callback) {
    var url = window.location.origin + '/Checks/create';
    $.ajax({
        url: url,
        method: form.attr('method'),
        data: form.serialize(),
        beforeSend: function() {},
        complete: function() {},
        success: function(data){callback(null, data);},
        error: function(err) {callback(err, null);},
    });
};
// Deletes a check from the DB
var destroyCheck = function(id, callback) {
    var url = window.location.origin + '/Checks/destroy';
    $.ajax({
        url: url,
        method: 'GET',
        data: {id: id},
        beforeSend: function() {},
        complete: function() {},
        success: function(data){callback(null, data);},
        error: function(err) {callback(err, null);},
    });
};
// Get a check statistics
var getCheckStats = function(id, callback) {
    var url = window.location.origin + '/Checks/getstats/'+id;
    $.ajax({
        url: url,
        method: 'GET',
        beforeSend: function() {},
        complete: function() {},
        success: function(data){callback(null, data);},
        error: function(err) {callback(err, null);},
    });
};
// Create user
var createUser = function(form, callback) {
    var url = window.location.origin + '/User/create/';
    $.ajax({
        url: url,
        method: form.attr('method'),
        data: form.serialize(),
        beforeSend: function() {},
        complete: function() {},
        success: function(data){callback(null, data);},
        error: function(err) {callback(err, null);},
    });
};
