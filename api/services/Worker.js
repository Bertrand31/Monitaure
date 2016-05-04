var async = require('async');
var net = require('net');

let checkPort = function(check, callback) {
	const dateStart = new Date();
	const timeStart = Date.now();

	let callbackObject = {
		checkId: check.id,
		checkName: check.name,
		checkEmailNotifications: check.emailNotifications,
		checkOwner: check.owner,
        // TODO: Improve
        lastPing: check.history[check.history.length - 1] ? Boolean(check.history[check.history.length - 1].time) : null,
		open: false,
		duration: null,
		date: dateStart
	};

	let connection = net.connect(check.port, check.domainNameOrIP, function() {
		let difference = Date.now() - timeStart;
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

			let asyncChecks = [];

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
                    // If notifications are activated for this check and
                    // this isn't the first time we ping it
					if (ping.checkEmailNotifications && ping.lastPing !== null) {
                        // If the check is down and wasn't last time we checked
                        if (!ping.open && ping.lastPing) {
                            User.findOne({id: ping.checkOwner}).exec(function(err, user) {
                                if (err) console.log(err);
                                Notifications.sendEmailAlert(user.email, ping.checkName);
                            });
                        }
                        // If the check is up and was down last time we checked
                        else if (ping.open && !ping.lastPing) {
                            User.findOne({id: ping.checkOwner}).exec(function(err, user) {
                                if (err) console.log(err);
                                Notifications.sendUpAlert(user.email, ping.checkName, 'XXX');
                            });
                        }
					}
				});
			});
		});
	}, sails.config.checkInterval);
};
