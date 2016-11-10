const DB = require('../services/DB');
const { getReports, markAsRead, generatePDF } = require('../services/Reports');

module.exports = {
    /**
     * HTTP route to fetch all reports
     * @param {Object} req - HTTP GET request
     * @param {Object} res - Express' response object
     * @returns {JSON} An error, if needs be, or the reports JSON object
     */
    getall: (req, res) => {
        getReports(DB.fetchOne, req.user.id, (err, reports) => {
            if (err) return res.serverError(err);

            return res.json(reports);
        });
    },

    /**
     * HTTP route to mark a report as read
     * @param {Object} req - HTTP GET request
     * @param {Object} res - Express' response object
     * @returns {JSON} An error, if needs be, or an empty json object
     */
    markasread: (req, res) => {
        markAsRead(DB.fetchOne, DB.update, req.user.id, req.param('id'));

        return res.ok({});
    },

    /**
     * HTTP route to generate a PDF from a report
     * @param {Object} req - HTTP GET request
     * @param {Object} res - Express' response object
     * @returns {JSON} An error, if needs be, or the requested report as a PDF
     */
    export: (req, res) => {
        generatePDF(DB.fetchOne, req.user.id, req.param('id'), (err, out) => {
            if (err) return res.send(err.message);

            return out.stream.pipe(res);
        });
    },
};

