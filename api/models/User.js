/**
 * User.js
 *
 * @description :: User model
 */

const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = {

    identity: 'User',

    attributes: {
        username: {
            type: 'string',
            minLength: 2,
            maxLength: 20,
            required: true,
            unique: true,
        },

        email: {
            type: 'email',
            email: true,
            required: true,
            unique: true,
        },

        emailMD5: {
            type: 'string',
        },

        confirmationToken: {
            type: 'string',
        },

        confirmedAccount: {
            type: 'boolean',
            defaultsTo: false,
        },

        password: {
            type: 'string',
            minLength: 6,
            required: true,
        },

        lastConnection: {
            type: 'date',
        },

        gcmSubscriptions: {
            type: 'array',
            defaultsTo: [],
        },

        toJSON() {
            const obj = this.toObject();
            delete obj.password;
            return obj;
        },

        log: {
            type: 'array',
            defaultsTo: [],
        },

        checks: {
            collection: 'Check',
            via: 'owner',
        },

    },

    beforeCreate(user, callback) {
        // Hash user's email (for Gravatar)
        user.emailHash = crypto.createHash('md5').update(user.email).digest('hex');
        // Creates a token to send the user an account confirmation link
        user.confirmationToken = crypto.randomBytes(16).toString('hex');
        // Initializes the 'last connection' property with current date
        user.lastConnection = new Date();
        // Stores password's salted hash (10 being the number of salt rounds)
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                sails.log.eror(err);
                return callback(err);
            }

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    sails.log.error(err);
                    return callback(err);
                }

                user.password = hash;
                return callback();
            });
        });
    },
};
