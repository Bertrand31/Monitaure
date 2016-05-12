const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendgridOptions = {
    auth: {
        api_user: sails.config.sendgridUsername,
        api_key: sails.config.sendgridPassword
    }
};

const emailClient = nodemailer.createTransport(sgTransport(sendgridOptions));

module.exports = {

    /**
     * Send an alert to an user warning him a check is down
     * @param {String} userEmail - address we send the email to
     * @param {String} checkName - name of the check that is down
     */
    sendDownAlert: function(userEmail, checkName) {
        const email = {
            from: sails.config.emailAddress,
            to: userEmail,
            subject: `🚨  Monitaure alert: ${checkName} is DOWN!`,
            text: `Alert: ${checkName} is DOWN`
        };
        emailClient.sendMail(email, function(err) {
            if (err) return sails.log.error(err);
        });
    },

    /**
     * Send an alert to an user telling him a check is back up
     * @param {String} userEmail - address we send the email to
     * @param {String} checkName - name of the check that is back up
     * @param {Number} outageDuration - number of minutes the check was down
     */
    sendUpAlert: function(recipient, checkName, outageDuration) {
        const email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `✓ Monitaure alert: ${checkName} is back UP!`,
            text: `${checkName} is back up after ${outageDuration} minutes of downtime.`
        };
        emailClient.sendMail(email, function(err) {
            if (err) return sails.log.error(err);
        });
    },

    /**
     * Send a 'confirm your email address' email to a newly created user
     * @param {Object} user - raw database record of the user we just created
     */
    sendConfirmationEmail: function(user) {
        const email = {
            from: sails.config.emailAddress,
            to: user.email,
            subject: `Monitaure account confirmation`,
            html: `To confirm your email address and activate your Monitaure account, <a href="${sails.config.baseUrl}/account/confirm/${user.confirmationToken}">click here</a>.<br/>If your did not try to create such account, please ignore this email.`
        };
        emailClient.sendMail(email, function(err) {
            if (err) return sails.log.error(err);
        });
    }
};
