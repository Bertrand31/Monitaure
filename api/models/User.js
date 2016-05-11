/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt'),
      crypto = require('crypto');

module.exports = {

    identity: 'User',

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        emailMD5: {
            type: 'string'
        },

        confirmationToken: {
            type: 'string'
        },

        confirmedAccount: {
            type: 'boolean',
            defaultsTo: false
        },

        password: {
            type: 'string',
            minLength: 6,
            required: true
        },

        toJSON: function() {
            const obj = this.toObject();
            delete obj.password;
            return obj;
        },

        checks: {
            collection: 'Check',
            via: 'owner'
        }

    },

    beforeCreate: function(user, callback) {

        user.emailHash = crypto.createHash('md5').update(user.email).digest('hex');

        user.confirmationToken = crypto.randomBytes(16).toString('hex');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                sails.log.eror(err);
                return callback(err);
            }

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    sails.log.error(err);
                    return callback(err);
                }

                user.password = hash;
                return callback();
            });
        });
    }
};
