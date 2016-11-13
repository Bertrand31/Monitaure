const jsreport = require('jsreport');
const uuid = require('uuid');

const { customFloor, calcCheckStats } = require('./Utilities');
const { reportPDF } = require('./Templates');

const config = require('../../config/local');

module.exports = {
    /**
     * Fetch all of the user's reportd from the DB
     * @param {Function} fetcher - a function fetching a single record
     * @param {Object} userId - the ID of the user
     */
    getReports(fetcher, userId, callback) {
        fetcher('user', userId, (err, user) => callback(err, user.reports));
    },

    /**
     * Mark a report a read
     * @param {Function} fetcher - a function fetching a single record
     * @param {Object} userId - the ID of the user
     */
    markAsRead(fetcher, updater, userId, reportId) {
        fetcher('user', userId, (err, user) => {
            if (err) sails.log.error(err);

            reports = [ ...user.reports ];
            reports[reportId].seen = true;

            updater('user', { id: userId }, { reports }, (err) => {
                if (err) sails.log.error(err);
            });
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
            const newReport = Object.assign({},
                {
                    id: uuid.v4(),
                    checkId: check.id,
                    checkName: check.name,
                    date: Date.now(),
                    seen: false,
                },
                {
                    data: calcCheckStats(customFloor, check.history, config.checkInterval),
                }
            );
            newReportsArray.push(newReport);
        });

        return newReportsArray;
    },
    /**
     * Generate a PDF from a report
     * @param {Array} checks - an array container check records
     * @returns {Array} an array containing reports for the given checks
     */
    generatePDF(fetcher, userId, requestedId, callback) {
        fetcher('user', userId, (err, user) => {
            if (err) return callback(err);

            // For some reason find() is buggy. Using filter()[0] instead.
            const requestedReport = user.reports.filter(report => report.id === requestedId)[0];

            jsreport.render(reportPDF(requestedReport))
                .then(out => callback(null, out))
                .catch(err => callback(err));
        });
    },
};
