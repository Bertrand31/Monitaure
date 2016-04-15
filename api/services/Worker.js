var async = require('async');
var net = require('net');

var checkPort = function(check, callback) {
    var dateStart = new Date();
    var timeStart = Date.now();

    var callbackObject = {
        checkId: check.id,
        checkName: check.name,
        open: false,
        duration: null,
        date: dateStart
    };

    var connection = net.connect(check.port, check.domainNameOrIP, function() {
        var difference = Date.now() - timeStart;
        connection.destroy();
        callbackObject.open = true;
        callbackObject.duration = difference;
        return callback(callbackObject);
    });
    connection.on('error', function() {
        return callback(callbackObject);
    });
    setTimeout(function() {
        if (!connection.destroyed) {
            connection.destroy();
            return callback(callbackObject);
        }
    }, sails.config.checkTimeout);
};

module.exports = function () {
    setInterval(function() {
        Check.find().exec(function(err, checks) {
            if (err) throw err;

            var asyncChecks = [];

            checks.forEach(function(check) {
                asyncChecks.push(function(callback) {
                    checkPort(check, function(result){
                        callback(null, result);
                    });
                });
            });

            async.parallel(asyncChecks, function(err, pings){
                if (err) throw err;
                pings.forEach(function(ping) {
                    CheckManagement.insertHistory(ping);
                });
            });
        });
    }, sails.config.checkInterval);
};
