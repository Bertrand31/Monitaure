const baseUrl = sails.config.baseUrl;

module.exports = {
    /**
     * Send an alert to an user warning him a check is down
     * @param {Object} user - a user object from the database
     * @param {String} checkName - name of the check that is down
     */
    sendDownAlert(user, checkId, checkName) {
        const alertTitle = `🚨  Monitaure alert: ${checkName} is DOWN!`;
        const alertText = `Alert: ${checkName} is DOWN`;

        Sendgrid.send(user.email, alertTitle, alertText);
        GCM.send(user.gcmSubscriptions, alertText);
        Log.addLogEntry(DB.update, user, checkId, checkName, 'downAlert', alertText);
    },

    /**
     * Send an alert to an user telling him a check is back up
     * @param {String} user - a usr object from the database
     * @param {String} checkName - name of the check that is back up
     * @param {Number} outageDuration - number of minutes the check was down
     */
    sendUpAlert(user, checkId, checkName, outageDuration) {
        const alertTitle = `✓ Monitaure alert: ${checkName} is back UP!`;
        const alertText = `${checkName} is back up after ${outageDuration} minutes of downtime`;

        Sendgrid.send(user.email, alertTitle, alertText);
        GCM.send(user.gcmSubscriptions, alertText);
        Log.addLogEntry(DB.update, user, checkId, checkName, 'upAlert', alertText);
    },

    /**
     * Send a 'confirm your email address' email to a newly created user
     * @param {Object} user - raw database record of the user we just created
     */
    sendConfirmationEmail(user) {
        const emailSubject = 'Monitaure account confirmation';
        const emailBody = EmailTemplates.Confirmation(`${baseUrl}/account/confirm/${user.confirmationToken}`, user.username);

        Sendgrid.send(user.email, emailSubject, emailBody);
    },
};
