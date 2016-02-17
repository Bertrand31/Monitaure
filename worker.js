var sails = require('sails');
var net = require('net');
var timeout = 1000;

var checkPort = function(target, port, callback) {
    var open = false;
    var timeStart = Date.now();
    var connection = net.connect(port, target, function() {
        var difference = Date.now() - timeStart;
        open = true;
        connection.destroy();
        return callback({ open: open, duration: difference });
    });
    setTimeout(function() {
        if (!connection.destroyed) {
            connection.destroy();
            return callback({ open: open, duration: null });
        }
    },timeout);
}

ChecksManagement.listChecks(null, function(checks) {
    for (i=0; i<checks.length; i++) {
        console.log(checks[i].name);
        checkPort(checks[i].domainNameOrIP, checks[i].port, function(results) {
            console.log(results);
        });
    }
});
