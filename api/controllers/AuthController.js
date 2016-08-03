const passport = require('passport');

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false,
    },
    /**
     * HTTP route for login requests
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     */
    login(req, res) {
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                return res.view('login', {
                    message: info.message,
                    user,
                });
            }
            req.logIn(user, (err) => {
                if (err) res.send(err);

                UserManagement.updateLastConnection(DB.update, user.id);
                return res.redirect('/');
            });
        })(req, res);
    },
    /**
     * HTTP route for logout requests
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     */
    logout(req, res) {
        req.logout();
        res.redirect('/');
    },
};
