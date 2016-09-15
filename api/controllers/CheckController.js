module.exports = {

    /**
     * HTTP route to get a check's detailled statistics like:
     * min/max/avg response time, last 20 pings, last downtime
     * @param {Object} req - HTTP request (must be GET)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the check's statistics
     */
    getcheckstats(req, res) {
        CheckManagement.getData(DB.fetchOne, req.user.id, req.param('id'), (err, data) => {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },

    /**
     * HTTP route to get a the user's data (name, emailHash),
     * his global stats and basic data about his checks
     * @param {Object} req - HTTP request (must be GET)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the user's and his checks' data
     */
    getuserandglobalstats(req, res) {
        CheckManagement.getUserAndGlobalStats(DB.fetchAndPopulate, req.user.id, (err, data) => {
            if (err) return res.serverError(err);

            return res.json(data);
        });
    },

    /**
     * HTTP route to create a check
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the created check
     */
    create(req, res) {
        const data = {
            name: String(req.param('name')),
            domainNameOrIP: String(req.param('domainNameOrIP')),
            port: Number(req.param('port')),
            emailNotifications: Boolean(req.param('emailNotifications')),
            owner: req.user.id,
        };
        CheckManagement.createCheck(DB.fetchAndPopulate, DB.create, req.user.id, data, (err, created) => {
            if (err) return res.serverError(err);

            return res.json(created);
        });
    },

    /**
     * HTTP route to update an existing check
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the updated check
     */
    update(req, res) {
        const data = {
            name: String(req.param('name')),
            emailNotifications: Boolean(req.param('emailNotifications')),
        };
        CheckManagement.updateCheck(DB.fetchOne, DB.update, req.user.id, req.param('id'), data, (err, updated) => {
            if (err) return res.serverError(err);

            return res.json(updated[0]);
        });
    },

    /**
     * HTTP route to delete an existing check
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the destroyed check
     */
    destroy(req, res) {
        CheckManagement.destroyCheck(DB.fetchOne, DB.destroy, req.user.id, req.param('id'), (err, destroyed) => {
            if (err) return res.serverError(err);

            return res.json(destroyed[0]);
        });
    },
};

