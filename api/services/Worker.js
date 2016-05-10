const async = require('async');
const net = require('net');

const checkPort = function(check, callback) {
    const dateStart = new Date();
    const timeStart = Date.now();

    const callbackObject = {
        checkId: check.id,
        checkName: check.name,
        checkEmailNotifications: check.emailNotifications,
        checkOwner: check.owner,
        checkHistory: check.history,
        open: false,
        duration: null,
        date: dateStart
    };

    const connection = net.connect(check.port, check.domainNameOrIP, function() {
        callbackObject.open = true;
        callbackObject.duration = Date.now() - timeStart;
        connection.destroy();
        return callback(callbackObject);
    });

    connection.on('error', function() {
        connection.destroy();
        return callback(callbackObject);
    });

    setTimeout(function() {
        if (!connection.destroyed) {
            connection.destroy();
            return callback(callbackObject);
        }
    }, sails.config.checkTimeout);
};

const pingHandling = function(ping) {
    CheckManagement.insertHistory(ping, function(err) {
        if (err) return sails.log.error(err);
    });

    const lastCheckHistory = ping.checkHistory[ping.checkHistory.length -1] || null;
    // If email notifications are activated for this check and
    // this isn't the first time we ping it
    if (ping.checkEmailNotifications && lastCheckHistory !== null) {
        // If the check is down and wasn't last time we checked
        if (!ping.open && lastCheckHistory.time !== null) {
            User.findOne({ id: ping.checkOwner }).exec(function(err, user) {
                if (err) sails.log.error(err);
                Messages.sendDownAlert(user.email, ping.checkName);
            });
        }
        // If the check is up and was down last time we checked
        else if (ping.open && lastCheckHistory.time === null) {
            User.findOne({ id: ping.checkOwner }).exec(function(err, user) {
                if (err) sails.log.error(err);

                let downtime = 0,
                    i = ping.checkHistory.length - 1;

                while (ping.checkHistory[i].time === null) {
                    downtime += sails.config.checkInterval / 60000;
                    i--;
                }

                Messages.sendUpAlert(user.email, ping.checkName, downtime);
            });
        }
    }
};

module.exports = function () {
    setInterval(function() {
        Check.find().exec(function(err, checks) {
            if (err) throw err;

            const asyncChecks = [];

            checks.forEach(function(check) {
                asyncChecks.push(function(callback) {
                    checkPort(check, function(result){
                        callback(null, result);
                    });
                });
            });

            async.parallel(asyncChecks, function(err, pings) {
                if (err) throw err;
                pings.forEach(function(ping) {
                    pingHandling(ping);
                });
            });
        });
    }, sails.config.checkInterval);
};
