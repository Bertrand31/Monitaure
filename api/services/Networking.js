var net = require('net');
var timeout = 1000;

module.exports = {

    checkPort: function(target, port, callback) {
        var open = false;
        var connection = net.connect(port, target, function() {
            open = true;
            connection.destroy();
        });
        setTimeout(function() {
            connection.destroy();
            callback(open);
        },timeout);
    }

}
