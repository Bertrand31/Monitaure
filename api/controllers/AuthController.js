const passport = require('passport');

module.exports = {
    /**
     * HTTP route for login requests
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     */
    login: (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                return res.send({
                    message: info.message,
                    user,
                });
            }

            req.login(user, (err) => {
                if (err) res.send(err);

                UserManagement.updateLastConnection(DB.update, user.id);

                return res.send({
                    message: info.message,
                    user: {
                        username: user.username,
                        emailHash: user.emailHash,
                    },
                });
            });
        })(req, res);
    },

    /**
     * HTTP route for logout requests
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     */
    logout: (req, res) => {
        req.logout();
        return res.ok({});
    },

    /**
     * HTTP route for checking whether the user's session
     * is connected and if his session is still valid
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     */
    isLoggedIn: (req, res) => {
        if (req.isAuthenticated()) {
            return res.send({
                isLoggedIn: true,
            });
        }
        return res.send({
            isLoggedIn: false,
        });
    },
};
