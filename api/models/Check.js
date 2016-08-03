/**
 * Check.js
 *
 * @description :: Each check represents a port to be checked on a particular server, specified through an IP adress or a domain name
 */
module.exports = {

    identity: 'Check',

    attributes: {

        name: {
            type: 'string',
            required: true,
        },

        domainNameOrIP: {
            type: 'string',
            required: true,
        },

        port: {
            type: 'integer',
            required: true,
        },

        history: {
            type: 'array',
            defaultsTo: [],
        },

        emailNotifications: {
            type: 'boolean',
            defaultsTo: false,
        },

        owner: {
            model: 'User',
        },
    },
};

