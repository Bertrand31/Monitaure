module.exports = {
    getall(req, res) {
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        Log.getLogs(DB.fetchOne, req.user.id, (err, data) => {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },
    /**
     * HTTP route to delete a log entry
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} An error, if needs be
     */
    destroy(req, res) {
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        Log.destroyLogEntry(DB.fetchOne, DB.update, req.user.id, req.param('id'), (err) => {
            if (err) return res.serverError(err);
        });
    },
};

