const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt');

passport.serializeUser(function(user, callback) {
    return callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
    User.findOne({ id: id }, function (err, user) {
        if (err) return sails.log.error(err);

        if (!user) {
            return callback(null, false);
        } else {
            return callback(null, user);
        }
    });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return callback(err);

        if (!user) {
            return callback(null, false, { message: 'Incorrect username.' });
        } else if (!user.confirmedAccount) {
            return callback(null, false, { message: 'Account not confirmed yet. Check your emails.' });
        }

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) throw err;

            if (!res)
                return callback(null, false, {
                    message: 'Invalid Password'
                });
            const returnUser = {
                username: username,
                email: user.email,
                createdAt: user.createdAt,
                id: user.id
            };
            return callback(null, returnUser, {
                message: 'Logged In Successfully'
            });
        });
    });
}
));

