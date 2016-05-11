module.exports = {
    createUser: function(userData, callback) {
        if (userData.password !== userData.confirmPassword) {
            return callback('passwords-mismatch');
        }

        delete userData.confirmPassword;
        User.create(userData).exec(function (err, user) {
            if (err) return callback(err);

            if (user) {
                Messages.sendConfirmationEmail(user, function(err) {
                    if (err) return sails.log.error(err);

                    return callback(null, user);
                });
            }
        });
    }
};
