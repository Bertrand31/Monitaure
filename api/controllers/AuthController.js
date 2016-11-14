const passport = require('passport');

const DB = require('../services/DB');
const { updateLastConnection, formatUser } = require('../services/UserManagement');

module.exports = {
    /**
     * HTTP route for login requests
     * @param {Object} req - HTTP request
     * @param {Object} res - Express' response object
     */
    login: (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                return res.json({
                    message: info.message,
                    user,
                });
            }

            req.login(user, (err) => {
                if (err) res.send(err);

                updateLastConnection(DB.update, user.id);

                const formattedUser = formatUser(user);
                formattedUser.isLoggedIn = true;

                return res.json({
                    message: info.message,
                    user: formattedUser,
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
};
