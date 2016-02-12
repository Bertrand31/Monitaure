var net = require('net');
var timeout = 1000;

module.exports = {

    checkPort: function(target, port, callback) {
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

}
