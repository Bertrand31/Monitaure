module.exports = {
    /**
     * Create an user
     * @param {Object} userData - user data (name, email, etc.)
     * @param {Function} callback
     */
    createUser: function(userData, callback) {
        if (userData.password !== userData.confirmPassword) {
            return callback('passwords-mismatch');
        }

        delete userData.confirmPassword;
        DB.create('user', userData, function(err, user) {
            if (err) return callback(err);

            if (user) {
            }
        });
    },

    /**
     * Confirms an user account by updating the database record corresponding to the passed token
     * @param {String} confirmationToken - confirmation token
     * @param {Function} callback
     */
    confirmUser: function(confirmationToken, callback) {
        DB.update('user', { confirmationToken: confirmationToken }, { confirmedAccount: true }, function(err) {
            return callback(err);
        });
    }
};
