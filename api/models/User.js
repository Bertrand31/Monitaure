/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt'),
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

        password: {
            type: 'string',
            minLength: 6,
            required: true
        },

        toJSON: function() {
            let obj = this.toObject();
            delete obj.password;
            return obj;
        },

        checks: {
            collection: 'Check',
            via: 'owner'
        }

    },
    beforeCreate: function(user, cb) {

        user.emailHash = crypto.createHash('md5').update(user.email).digest('hex');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                sails.log.eror(err);
                return cb(err);
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        sails.log.error(err);
                        return cb(err);
                    } else {
                        user.password = hash;
                        return cb();
                    }
                });
            }
        });
    }
};
