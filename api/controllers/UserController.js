module.exports = {
    /**
     * HTTP route to fetch a user's data
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the corresponding user record
     */
    find: (req, res) => {
        UserManagement.getData(DB.fetchOne, req.user.id, (err, user) => {
            if (err) return res.badRequest(err.details);

            return res.json(user);
        });
    },

    /**
     * HTTP route to create a user account
     * req.body contains the user data (name, email, etc.)
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the created user record
     */
    create: (req, res) => {
        UserManagement.create(DB.create, req.body, (err, user) => {
            if (err) return res.badRequest(err.details);

            Notifications.sendConfirmationEmail(user);
            return res.json(user);
        });
    },

    /**
     * HTTP route to confirm a newly created user account
     * Is called like this: /account/confirm/:confirmationToken
     * The confirmation token is passed as the 'id' paramter
     * @param {Object} req - HTTP request (must be GET)
     * @param {Object} res - Express' response object
     * @returns {HTML} Renders a page depending on the account confirmation success
     */
    confirm: (req, res) => {
        if (typeof req.param('id') !== 'string' || req.param('id').length !== 32) {
            return res.json({ result: 'notconfirmed' });
        }
        UserManagement.confirm(DB.update, req.param('id'), (err, confirmed) => {
            if (err) return res.json({ result: 'error' });

            if (confirmed.length > 0) {
                return res.json({ result: 'confirmed' });
            } else {
                return res.json({ result: 'notconfirmed' });
            }
        });
    },

    /**
     * HTTP route to set user's GCM credentials
     * The confirmation token is passed as the 'id' paramter
     * @param {Object} req - HTTP request (must be GET)
     * @param {Object} res - Express' response object
     */
    setgcmcredentials: (req, res) => {
        UserManagement.setGCMCredentials(DB.fetchOne, DB.update, req.user.id, req.param('subscription'));
        return res.ok({});
    },
};
