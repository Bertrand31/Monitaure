const jsreport = require('jsreport');
const uuid = require('uuid');

module.exports = {
    /**
     * Fetch all of the user's reportd from the DB
     * @param {Function} fetcher - a function fetching a single record
     * @param {Object} userId - the ID of the user
     */
    getReports(fetcher, userId, callback) {
        fetcher('user', userId, (err, user) => callback(err, user.reports));
    },
    markAsRead(updater, userId, reports) {
        console.log(reports);
        reports.forEach((report, i) => {
            reports[i]['seen'] = true;
            // report['seen'] = true;
            // return report;
        });
        updater('user', { id: userId }, { reports }, (err) => {
            if (err) sails.log.error(err);
        });
    },
    /**
     * Generate reports for a given checks array
     * @param {Array} checks - an array container check records
     * @returns {Array} an array containing reports for the given checks
     */
    generateReports(checks) {
        const newReportsArray = [];
        checks.forEach((check) => {
            const newReport = Object.assign({}, Utilities.calcCheckStats(check.history), {
                id: uuid.v4(),
                checkId: check.id,
                checkName: check.name,
                date: Date.now(),
                seen: false,
            });
            newReportsArray.push(newReport);
        });

        return newReportsArray;
    },
};
