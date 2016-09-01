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

