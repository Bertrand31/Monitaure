const gcm = require('node-gcm');
const sender = new gcm.Sender(sails.config.gcmServerKey);

module.exports = {
    send(text, gcmToken) {
        const message = new gcm.Message();
        message.addNotification('title', 'Monitaure');
        message.addNotification('body', text);

        sender.send(message, { registrationTokens: [gcmToken] }, (err, res) => {
            if (err) return sails.log.error(err);
            console.log(res);
        });
    },
};
