var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({ id: id }, function (err, user) {
		done(err, user);
		// done(null, user);
	});
});

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
            if (err) return done(err);

			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			} else if (!user.confirmedAccount) {
                return done(null, false, { message: 'Account not confirmed yet. Check your emails.' });
            }

			bcrypt.compare(password, user.password, function (err, res) {
                if (err) throw err;

				if (!res)
					return done(null, false, {
						message: 'Invalid Password'
					});
				var returnUser = {
                    username: username,
					email: user.email,
					createdAt: user.createdAt,
					id: user.id
				};
				return done(null, returnUser, {
					message: 'Logged In Successfully'
				});
			});
		});
	}
));

