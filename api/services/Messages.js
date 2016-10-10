const appEmail = sails.config.emailAddress;
const baseUrl = sails.config.baseUrl;

module.exports = {
    /**
     * Send an alert to an user warning him a check is down
     * @param {Function} sender - a function taking care of sending the message
     * @param {String} userEmail - address we send the email to
     * @param {String} checkName - name of the check that is down
     */
    sendDownAlert(user, checkName) {
        const alertText = `Alert: ${checkName} is DOWN`;

        const emailOptions = {
            from: appEmail,
            to: user.email,
            subject: `🚨  Monitaure alert: ${checkName} is DOWN!`,
            text: alertText,
        };

        Sendgrid.send(emailOptions);
        GCM.send(user.gcmSubscriptions, alertText);
    },

    /**
     * Send an alert to an user telling him a check is back up
     * @param {Function} sender - a function taking care of sending the message
     * @param {String} userEmail - address we send the email to
     * @param {String} checkName - name of the check that is back up
     * @param {Number} outageDuration - number of minutes the check was down
     */
    sendUpAlert(user, checkName, outageDuration) {
        const alertText = `${checkName} is back up after ${outageDuration} minutes of downtime.`;

        const emailOptions = {
            from: appEmail,
            to: user.email,
            subject: `✓ Monitaure alert: ${checkName} is back UP!`,
            text: alertText,
        };

        Sendgrid.send(emailOptions);
        GCM.send(user.gcmSubscriptions, alertText);
    },

    /**
     * Send a 'confirm your email address' email to a newly created user
     * @param {Function} sender - a function taking care of sending the message
     * @param {Object} user - raw database record of the user we just created
     */
    sendConfirmationEmail(sender, user) {
        const emailOptions = {
            from: appEmail,
            to: user.email,
            subject: 'Monitaure account confirmation',
            html: EmailTemplates.Confirmation(`${baseUrl}/account/confirm/${user.confirmationToken}`, user.username),
        };
        sender(emailOptions);
    },
};
