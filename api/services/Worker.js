var async = require('async');
var net = require('net');

var checkPort = function(check, callback) {
	var dateStart = new Date();
	var timeStart = Date.now();

	var callbackObject = {
		checkId: check.id,
		checkName: check.name,
		checkEmailNotifications: check.emailNotifications,
		checkOwner: check.owner,
        // TODO: Improve
        lastPing: check.history[check.history.length - 1] ? Boolean(check.history[check.history.length - 1].time) : false,
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
					if (ping.checkEmailNotifications) {
                        // TODO: Improve
                        if (!ping.open && ping.lastPing) {
                            User.findOne({id: ping.checkOwner}).exec(function(err, user) {
                                if (err) console.log(err);
                                Notifications.sendEmailAlert(user.email, ping.checkName, 'down');
                            });
                        } else if (ping.open && !ping.lastPing) {
                            User.findOne({id: ping.checkOwner}).exec(function(err, user) {
                                if (err) console.log(err);
                                Notifications.sendEmailAlert(user.email, ping.checkName, 'up');
                            });
                        }
					}
				});
			});
		});
	}, sails.config.checkInterval);
};
