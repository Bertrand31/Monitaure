const { scheduleJob } = require('node-schedule');

module.exports = (fetcher, updater) => {
    // scheduleJob('0 0 1 * *', () => {
    scheduleJob('*/5 * * * *', () => {
        fetcher('user', {}, (err, users) => {
            if (err) sails.log.error(err);

            users.forEach((user) => {
                fetcher('check', { owner: user.id }, (err, checks) => {
                    const newReportsArray = [ ...user.reports ];
                    checks.forEach((check) => {
                        const newReport = Object.assign({}, Utilities.calcCheckStats(check.history), {
                            checkId: check.id,
                            date: Date.now(),
                            seen: false,
                        });
                        newReportsArray.push(newReport);
                    });

                    updater('user', { id: user.id }, { reports: newReportsArray }, (err) => {
                        if (err) sails.log.error(err);
                    });
                    // TODO
                    // Notifications.sendNewReportsNotification(user, newReportsArray);
                });
            });
        });
    });
};
