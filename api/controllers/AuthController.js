const passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if (err || !user) {
                return res.view('login', {
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                // return res.send({ message: info.message, user: user });
                return res.redirect('/');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }

};
