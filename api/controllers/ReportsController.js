module.exports = {
    /**
     * HTTP route to fetch all reports
     * @param {Object} req - HTTP GET request
     * @param {Object} res - Express' response object
     * @returns {JSON} An error, if needs be, or the reports JSON object
     */
    getall: (req, res) => {
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        Reports.getReports(DB.fetchOne, req.user.id, (err, reports) => {
            if (err) return res.serverError(err);

            Reports.markAsRead(DB.update, req.user.id, reports);

            return res.json(reports);
        });
    },
};

