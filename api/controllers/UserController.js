module.exports = {
    /**
     * HTTP route to create a user account
     * req.body contains the user data (name, email, etc.)
     * @param {Object} req - HTTP request (must be POST)
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the created user record
     */
    create(req, res) {
        if (!req.wantsJSON) {
            return res.forbidden();
        }
        UserManagement.create(DB.create, req.body, (err, createdUser) => {
            if (err) return res.badRequest(err.details);

            Messages.sendConfirmationEmail(Sendgrid.send, createdUser);
            return res.json(200, createdUser);
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
    confirm(req, res) {
        UserManagement.confirm(DB.update, req.param('id'), (err, confirmed) => {
            if (err) return res.badRequest(err);

            if (confirmed.length > 0) {
                return res.render('confirmed');
            } else {
                return res.render('notconfirmed');
            }
        });
    },

    /**
     * HTTP route to set user's GCM credentials
     * The confirmation token is passed as the 'id' paramter
     * @param {Object} req - HTTP request (must be GET)
     * @param {Object} res - Express' response object
     */
    setgcmcredentials(req, res) {
        UserManagement.setGCMCredentials(DB.fetchOne, DB.update, req.user.id, req.param('subscription'));
    },
};
