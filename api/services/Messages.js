var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var sendgridOptions = {
    auth: {
        api_user: sails.config.sendgridUsername,
        api_key: sails.config.sendgridPassword
    }
};

var emailClient = nodemailer.createTransport(sgTransport(sendgridOptions));

module.exports = {

    sendDownAlert: function(recipient, checkName) {
        let email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `🚨  Monitaure alert: ${checkName} is DOWN!`,
            text: `Alert: ${checkName} is DOWN`
        };
        emailClient.sendMail(email, function(err) {
            if (err) sails.log.error(err);
        });
    },

    sendUpAlert: function(recipient, checkName, outageDuration) {
        let email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `✓ Monitaure alert: ${checkName} is back UP!`,
            text: `${checkName} is back up after ${outageDuration} minutes of downtime.`
        };
        emailClient.sendMail(email, function(err) {
            if (err) sails.log.error(err);
        });
    },

    sendConfirmationEmail: function(user, callback) {
        let email = {
            from: sails.config.emailAddress,
            to: user.email,
            subject: `Monitaure account confirmation`,
            text: `Please copy and paste this URL into your browser to activate your account : ${sails.config.baseUrl}/confirm-account/${user.confirmationToken}`
        };
        emailClient.sendMail(email, function(err) {
            if (err) {
                return callback(err);
            } else {
                return callback();
            }
        });
    }
};
