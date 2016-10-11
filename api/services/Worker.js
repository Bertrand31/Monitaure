const async = require('async');
const net = require('net');

const checkPort = (check, callback) => {
    const timeStart = Date.now();

    const callbackObject = {
        checkId: check.id,
        checkName: check.name,
        checkEmailNotifications: check.emailNotifications,
        checkOwner: check.owner,
        checkHistory: check.history,
        open: false,
        duration: null,
        date: new Date(),
    };

    const connection = net.connect(check.port, check.domainNameOrIP, () => {
        callbackObject.open = true;
        callbackObject.duration = Date.now() - timeStart;
        connection.destroy();
        return callback(callbackObject);
    });

    connection.on('error', () => {
        connection.destroy();
        return callback(callbackObject);
    });

    setTimeout(() => {
        if (!connection.destroyed) {
            connection.destroy();
            return callback(callbackObject);
        }
    }, sails.config.checkTimeout);
};

const pingHandling = (ping) => {
    CheckManagement.insertHistory(DB.fetchOne, DB.update, ping, (err) => {
        if (err) return sails.log.error(err);
    });

    const lastCheckHistory = ping.checkHistory[ping.checkHistory.length - 1] || null;
    // If email notifications are activated for this check and
    // this isn't the first time we ping it
    if (ping.checkEmailNotifications && lastCheckHistory !== null) {
        // If the check is down and wasn't last time we checked
        if (!ping.open && lastCheckHistory.duration !== null) {
            User.findOne({ id: ping.checkOwner }).exec((err, user) => {
                if (err) sails.log.error(err);
                Notifications.sendDownAlert(user, ping.checkName);
            });
        // If the check is up and was down last time we checked
        } else if (ping.open && lastCheckHistory.duration === null) {
            User.findOne({ id: ping.checkOwner }).exec((err, user) => {
                if (err) sails.log.error(err);

                let downtime = 0;
                let i = ping.checkHistory.length - 1;

                while (ping.checkHistory[i].duration === null) {
                    downtime += sails.config.checkInterval / 60000;
                    i--;
                }

                Notifications.sendUpAlert(user, ping.checkName, downtime);
            });
        }
    }
};

module.exports = (fetcher) => {
    setInterval(() => {
        fetcher('check', {}, (err, checks) => {
            if (err) sails.log.error(err);

            const asyncChecks = [];

            checks.forEach((check) => {
                asyncChecks.push((callback) => {
                    checkPort(check, (result) => {
                        callback(null, result);
                    });
                });
            });

            async.parallel(asyncChecks, (err, pings) => {
                if (err) throw err;
                pings.forEach(ping => pingHandling(ping));
            });
        });
    }, sails.config.checkInterval);
};
