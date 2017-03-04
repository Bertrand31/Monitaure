const countAttributes = test => array => array.filter(test).length;
const countUnseenItems = countAttributes(item => item.seen === false);

/**
 * Formats a raw 'User' record
 * @param {Object} user - 'User' record
 * @param {Object} formatted user
 */
const formatUser = user => ({
    username: user.username,
    emailHash: user.emailHash,
    unseenReports: countUnseenItems(user.reports),
    unseenLog: countUnseenItems(user.log),
});

module.exports = {
    formatUser,
    /**
     * Gets a user's basic data
     * @param {Function} fetcher - record fetching function
     * @param {Object} user - user data (name, emailHash)
     * @param {Function} callback
     */
    getData: (fetcher, userId, callback) => {
        fetcher('user', userId, (err, user) => {
            if (err) return callback(err);
            if (!user) return callback();

            const formattedUser = formatUser(user);
            formattedUser.isLoggedIn = true;

            return callback(null, formattedUser);
        });
    },
    /**
     * Create an user
     * @param {Function} creator - record creation function
     * @param {Object} userData - user data (name, email, etc.)
     * @param {Function} callback
     */
    create: (creator, userData, callback) => {
        console.log(userData);
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
    updateLastConnection: (updater, userId) => {
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
    setGCMCredentials: (fetcher, updater, userId, subscription) => {
        fetcher('user', userId, (err, user) => {
            if (err) return sails.log.error(err);

            // Is this Service Worker already registered? If so, we exit
            const swIsAlreadyRegistered = user.gcmSubscriptions.some(existingSubscription => JSON.stringify(existingSubscription) === subscription);
            if (swIsAlreadyRegistered) return;

            // Never more than 3 subscriptions total, so we first trim the array
            const gcmSubscriptions = user.gcmSubscriptions.slice(0, 2);
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
    confirm: (updater, confirmationToken, callback) => {
        updater('user', { confirmationToken }, { confirmedAccount: true }, callback);
    },
};
