const webpush = require('web-push');
const { log } = require('sails');

const config = require('../../config/local');

const options = { gcmAPIKey: config.gcmServerKey };

module.exports = {
    /**
     * Send a push notification through GCM
     * @param {Array} subscriptions - an array of GCM subscriptions
     * @param {String} payload - the payload we will be sending
     */
    send(subscriptions, payload) {
        subscriptions.forEach((subscription) => {
            webpush.sendNotification(subscription, payload, options)
                // .then(res => log.info(res))
                .catch(e => log.info(e));
        });
    },
};
