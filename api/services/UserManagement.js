module.exports = {
    /**
     * Create an user
     * @param {Function} creator - record creation function
     * @param {Object} userData - user data (name, email, etc.)
     * @param {Function} callback
     */
    create(creator, userData, callback) {
        if (userData.password !== userData.confirmPassword) {
            return callback('passwords-mismatch');
        }

        delete userData.confirmPassword;
        creator('user', userData, callback);
    },

    /**
     * Update a user's last connection date
     * @param {Function} updater - record update function
     * @param {String} userId - user id
     */
    updateLastConnection(updater, userId) {
        updater('user', { id: userId }, { lastConnection: new Date() }, (err) => {
            if (err) return sails.log.error(err);
        });
    },

    /**
     * Update a user's GCM credentials
     * @param {Function} updater - record update function
     * @param {String} userId - user id
     * @param {String} gcmToken - the user's Google Cloud Messaging ID
     */
    setGCMCredentials(updater, userId, subscription) {
        // const subscriptionObj = JSON.parse(subscription);
        // const gcmToken = subscriptionObj.endpoint.split('/').reverse()[0];
        // const { p256dh, auth } = subscriptionObj.keys;
        updater('user', { id: userId }, { gcmSubscription: JSON.parse(subscription) }, (err) => {
            if (err) return sails.log.error(err);
        });
    },

    /**
     * Confirms an user account by updating the database record corresponding to the passed token
     * @param {Function} updater - record update function
     * @param {String} confirmationToken - confirmation token
     * @param {Function} callback
     */
    confirm(updater, confirmationToken, callback) {
        updater('user', { confirmationToken }, { confirmedAccount: true }, callback);
    },
};
