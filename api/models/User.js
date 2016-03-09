/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    identity: 'user',

    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            minLength: 6,
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

        checks: {
            collection: 'check',
            via: 'owner'
        }

    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};
