var async = require('async');
var net = require('net');
var timeout = 1000;

var checkPort = function(check, callback) {
    var dateStart = new Date();
    var timeStart = Date.now();
    var connection = net.connect(check.port, check.domainNameOrIP, function(err) {
        if (err) console.log(err);
        var difference = Date.now() - timeStart;
        connection.destroy();
        callback({
            id: check.id,
            open: true,
            duration: difference,
            date: dateStart
        });
    });
    connection.on('error', function(err) {
        callback({
            id: check.id,
            open: false,
            duration: null,
            date: timeStart
        });
    });
    setTimeout(function() {
        if (!connection.destroyed) {
            connection.destroy();
            callback({
                id: check.id,
                open: false,
                duration: null,
                date: timeStart
            });
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
            ChecksManagement.insertHistory(results);
        });
    });
};
