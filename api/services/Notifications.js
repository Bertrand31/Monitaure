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
    sendEmailAlert: function(recipient, checkName, notificationType) {
        let email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `Monitaure alert: ${checkName} is ${notificationType}!`,
            text: `Alert: ${checkName} is ${notificationType}`
        };
        emailClient.sendMail(email, function(err) {
            if (err) console.log(err);
        });
    }
};
