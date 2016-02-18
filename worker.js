var async = require('async');
var net = require('net');
var timeout = 1000;

var checkPort = function(check, callback) {
    var timeStart = Date.now();
    var connection = net.connect(check.port, check.domainNameOrIP, function() {
        var difference = Date.now() - timeStart;
        connection.destroy();
        callback({
            id: check.id,
            open: true,
            duration: difference
        });
    });
    setTimeout(function() {
        if (!connection.destroyed) {
            connection.destroy();
            callback({
                id: check.id,
                open: false,
                duration: null
            });
        }
    },timeout);
}

module.exports = function (sendData) {
    ChecksManagement.listChecks(null, function(checks) {
        var results = [];
        var asyncChecks = [];

        checks.forEach(function(check) {
            asyncChecks.push(function(callback) {
                checkPort(check, function(result){
                    callback(null, result);
                })
            });
        });

        async.parallel(asyncChecks, function(err, results){
            sendData(results);
        });
    });
};
