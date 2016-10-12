module.exports = {

    /**
     * HTTP route to get a the user's data (name, emailHash),
     * his checks and their stats
     * @param {Object} req - HTTP request (must be GET)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the user's and his checks' data
     */
    getchecks(req, res) {
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        CheckManagement.getChecks(DB.fetch, req.user.id, (err, data) => {
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
        if (!req.wantsJSON) {
            return res.forbidden();
        }
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
        if (!req.wantsJSON) {
            return res.forbidden();
        }
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
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        CheckManagement.destroyCheck(DB.fetchOne, DB.destroy, req.user.id, req.param('id'), (err, destroyed) => {
            if (err) return res.serverError(err);

            return res.json(destroyed[0]);
        });
    },
};

