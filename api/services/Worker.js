var async = require('async');
var net = require('net');
var timeout = 1000;

var checkPort = function(check, callback) {
    var dateStart = new Date();
    var timeStart = Date.now();

    var callbackObject = {
        id: check.id,
        name: check.name,
        open: false,
        duration: null,
        date: dateStart
    };

    var connection = net.connect(check.port, check.domainNameOrIP, function(err) {
        if (err) console.log(err);
        var difference = Date.now() - timeStart;
        connection.destroy();
        callbackObject.open = true;
        callbackObject.duration = difference;
        callback(callbackObject);
    });
    connection.on('error', function(err) {
        callback(callbackObject);
    });
    setTimeout(function() {
        if (!connection.destroyed) {
            connection.destroy();
            callback(callbackObject);
        }
    },timeout);
};

module.exports = function (callback) {
    ChecksManagement.listChecks(null, function(checks) {
        var results = [];
        var asyncChecks = [];

        checks.forEach(function(check) {
            asyncChecks.push(function(callback) {
                checkPort(check, function(result){
                    callback(null, result);
                });
            });
        });

        async.parallel(asyncChecks, function(err, results){
            sails.sockets.blast('checksData', results);
            ChecksManagement.insertHistoryAndOutage(results);
        });
    });
};
