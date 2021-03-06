const { scheduleJob } = require('node-schedule');
const { connect } = require('net');

const DB = require('./DB');
const { insertHistory } = require('./CheckManagement');
const { sendDownAlert, sendUpAlert } = require('./Notifications');

const config = require('../../config/local');

const ping = (domainNameOrIP, port, callback) => {
    const timeStart = Date.now();

    const callbackObject = {
        open: false,
        duration: null,
        date: new Date(),
    };

    const connection = connect(port, domainNameOrIP, () => {
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
    }, config.checkTimeout);
};

const pingHandling = (check, ping) => {
    insertHistory(DB.fetchOne, DB.update, check.id, ping, (err) => {
        if (err) return sails.log.error(err);
    });

    const lastCheckHistory = check.history[check.history.length - 1] || null;
    // If email notifications are activated for this check and
    // this isn't the first time we ping it
    if (check.emailNotifications && lastCheckHistory !== null) {
        // If the check is down and wasn't last time we checked
        if (!ping.open && lastCheckHistory.duration !== null) {
            DB.fetchOne('user', check.owner, (err, user) => {
                if (err) sails.log.error(err);

                sendDownAlert(user, check.id, check.name);
            });
        // If the check is up and was down last time we checked
        } else if (ping.open && lastCheckHistory.duration === null) {
            let downtime = 0;
            let i = check.history.length - 1;
            while (typeof check.history[i] !== 'undefined' && check.history[i].duration === null) {
                downtime += config.checkInterval / 60000;
                i--;
            }

            DB.fetchOne('user', check.owner, (err, user) => {
                if (err) sails.log.error(err);

                sendUpAlert(user, check.id, check.name, downtime);
            });
        }
    }
};

module.exports = (fetcher) => {
    let checkInterval;
    try { checkInterval = config.checkInterval / 60000; }
    catch (err) { checkInterval = 5; }

    scheduleJob(`*/${checkInterval} * * * *`, () => {
        fetcher('check', {}, (err, checks) => {
            if (err) sails.log.error(err);

            // We throttle the pings, so it does not saturate the server ressources (mainly BW and CPU)
            // To calculate the interval between the pings, we figure out the time window all the pings
            // have to run without overlapping with the next cycle of pings. Then, we divide that number
            // with the number of checks minus one since the first ping will run with 0 delay
            const interval = (config.checkInterval - config.checkTimeout) / (checks.length - 1);

            checks.forEach((check, i) => {
                setTimeout(() => {
                    ping(check.domainNameOrIP, check.port, (result) => {
                        pingHandling(check, result);
                    });
                }, interval * i);
            });

        });
    });
};
