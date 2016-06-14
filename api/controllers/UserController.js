module.exports = {
    /**
     * HTTP route to create a user account
     * req.body contains the user data (name, email, etc.)
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     * @returns {JSON} Either an error or the created user record
     */
    create: function (req, res) {
        UserManagement.create(DB.create, req.body, function(err, createdUser) {
            if (err) return res.badRequest(err);

            Messages.sendConfirmationEmail(Sendgrid.send, createdUser);
            return res.json(200, createdUser);
        });
    },

    /**
     * HTTP route to confirm a newly created user account
     * Is called like this: /account/confirm/:confirmationToken
     * The confirmation token is passed as the 'id' paramter
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     * @returns {HTML} Renders a page depending on the account confirmation success
     */
    confirm: function (req, res) {
        UserManagement.confirm(DB.update, req.param('id'), function(err, confirmed) {
            if (err) return res.badRequest(err);

            if (confirmed.length > 0) {
                return res.render('confirmed');
            } else {
                return res.render('notconfirmed');
            }
        });
    }
};
