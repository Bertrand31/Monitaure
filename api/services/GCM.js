const webpush = require('web-push');

const options = { gcmAPIKey: sails.config.gcmServerKey };

module.exports = {
    send(subscriptions, payload) {
        subscriptions.forEach((subscription) => {
            webpush.sendNotification(subscription, payload, options)
                .then(res => sails.log.info(res))
                .catch(e => sails.log.error(e));
        });
    },
};
