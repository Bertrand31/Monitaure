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

        const user = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
        };

        creator('user', user, callback);
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
     * @param {Function} fetcher - DB fetching function
     * @param {Function} updater - record update function
     * @param {String} userId - user id
     * @param {String} subscription - the user's Google Cloud Messaging subscription
     */
    setGCMCredentials(fetcher, updater, userId, subscription) {
        fetcher('user', userId, (err, user) => {
            if (err) return sails.log.error(err);

            // Is this Service Worker already registered? If so, we exit
            const swIsAlreadyRegistered = user.gcmSubscriptions.some((existingSubscription) => JSON.stringify(existingSubscription) === subscription);
            if (swIsAlreadyRegistered) return;

            const gcmSubscriptions = user.gcmSubscriptions.concat();
            // Never more than 3 subscriptions total, so we first trim the array
            while (gcmSubscriptions.length > 2) {
                gcmSubscriptions.shift();
            }
            gcmSubscriptions.push(JSON.parse(subscription));

            updater('user', { id: userId }, { gcmSubscriptions }, (err) => {
                if (err) return sails.log.error(err);
            });
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
