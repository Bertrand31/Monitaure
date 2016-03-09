/**
 * Check.js
 *
 * @description :: Each check represents a port to be checked on a particular server, specified through an IP adress or a domain name
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    identity: 'check',

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        domainNameOrIP: {
            type: 'string',
            required: true
        },

        port: {
            type: 'integer',
            required: true
        },

        interval: {
            type: 'integer',
            defaultsTo: 10000
        },

        history: {
            type: 'array',
            defaultsTo: []
        },

        owner: {
            model: 'user'
        }

    }
};

