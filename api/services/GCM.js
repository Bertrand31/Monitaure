const webpush = require('web-push');

const options = { gcmAPIKey: sails.config.gcmServerKey };

module.exports = {
    send(subscription, payload) {
        webpush.sendNotification(subscription, payload, options)
            .then(res => sails.log.info(res))
            .catch(e => sails.log.error(e));
    },
};
