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
            subject: `Monitaure alert: ${checkName} is DOWN!`,
            text: `Alert: ${checkName} is DOWN`
        };
        emailClient.sendMail(email, function(err) {
            if (err) console.log(err);
        });
    },

    sendUpAlert: function(recipient, checkName, outageDuration) {
        let email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `Monitaure alert: ${checkName} is back UP!`,
            text: `${checkName} is back up after ${outageDuration} minutes of downtime.`
        };
        emailClient.sendMail(email, function(err) {
            if (err) console.log(err);
        });
    }
};
