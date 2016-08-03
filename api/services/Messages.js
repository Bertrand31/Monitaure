const appEmail = (typeof sails !== 'undefined') ? sails.config.emailAddress : 'notifications@monitaure.io';
const baseUrl = (typeof sails !== 'undefined') ? sails.config.baseUrl : 'https://monitaure.io';

module.exports = {
    /**
     * Send an alert to an user warning him a check is down
     * @param {Function} sender - a function taking care of sending the message
     * @param {String} userEmail - address we send the email to
     * @param {String} checkName - name of the check that is down
     */
    sendDownAlert(sender, userEmail, checkName) {
        const emailOptions = {
            from: appEmail,
            to: userEmail,
            subject: `🚨  Monitaure alert: ${checkName} is DOWN!`,
            text: `Alert: ${checkName} is DOWN`,
        };
        sender(emailOptions);
    },

    /**
     * Send an alert to an user telling him a check is back up
     * @param {Function} sender - a function taking care of sending the message
     * @param {String} userEmail - address we send the email to
     * @param {String} checkName - name of the check that is back up
     * @param {Number} outageDuration - number of minutes the check was down
     */
    sendUpAlert(sender, recipient, checkName, outageDuration) {
        const emailOptions = {
            from: appEmail,
            to: recipient,
            subject: `✓ Monitaure alert: ${checkName} is back UP!`,
            text: `${checkName} is back up after ${outageDuration} minutes of downtime.`,
        };
        sender(emailOptions);
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
