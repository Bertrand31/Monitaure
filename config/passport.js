const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, callback) => callback(null, user.id));

passport.deserializeUser((id, callback) => {
    DB.fetchOne('user', id, (err, user) => {
        if (err) return sails.log.error(err);

        if (!user) {
            return callback(null, false);
        }

        return callback(null, user);
    });
});

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    (username, password, callback) => {
        DB.fetch('user', { username }, (err, data) => {
            if (err) return callback(err);

            const user = data[0];

            if (!user) {
                return callback(null, false, { message: 'Incorrect username' });
            } else if (!user.confirmedAccount) {
                return callback(null, false, { message: 'Account not confirmed yet. Please check your emails.' });
            }

            bcrypt.compare(password, user.password, (err, res) => {
                if (err) throw err;

                if (!res) {
                    return callback(null, false, {
                        message: 'Invalid password',
                    });
                }

                const returnUser = {
                    username,
                    email: user.email,
                    emailHash: user.emailHash,
                    createdAt: user.createdAt,
                    id: user.id,
                };
                return callback(null, returnUser, {
                    message: 'Logged in successfully',
                });
            });
        });
    }
));

