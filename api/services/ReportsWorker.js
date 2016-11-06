const { scheduleJob } = require('node-schedule');

module.exports = (fetcher, updater) => {
    scheduleJob('0 0 1 * *', () => {
    // scheduleJob('*/5 * * * *', () => {
        fetcher('user', {}, (err, users) => {
            if (err) sails.log.error(err);

            users.forEach((user) => {
                fetcher('check', { owner: user.id }, (err, checks) => {
                    if (err) sails.log.error(err);

                    const newReports = Reports.generateReports(checks);
                    const allReportsArray = [
                        ...user.reports,
                        ...newReports,
                    ];

                    updater('user', { id: user.id }, { reports: allReportsArray }, (err) => {
                        if (err) sails.log.error(err);
                    });

                    Notifications.sendNewReportsNotification(user, newReports);
                });
            });
        });
    });
};
