module.exports = {
    /**
     * HTTP route to fetch all log entries
     * @param {Object} req - HTTP GET request
     * @param {Object} res - Express' response object
     * @returns {JSON} An error, if needs be, or the log JSON object
     */
    getall: (req, res) => {
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        Log.getLogs(DB.fetchOne, req.user.id, (err, data) => {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },
};

