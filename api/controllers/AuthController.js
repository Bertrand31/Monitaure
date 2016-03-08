var passport = require('passport');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	login: function(req, res) {

		passport.authenticate('local', function(username, password, done) {
            console.log(username);
            console.log('-------');
            console.log(password);
            console.log('-------');
            console.log(done);
			// if ((err) || (!user)) {
			// 	return res.send({
			// 		message: info.message,
			// 		user: user
			// 	});
			// }
			// req.logIn(user, function(err) {
			// 	if (err) res.send(err);
			// 	return res.send({
			// 		message: info.message,
			// 		user: user
			// 	});
			// });

		})(req, res);
	},

	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};

