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
    sendEmailAlert: function(recipient, checkName) {
        var email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: 'Monitaure alert: ' + checkName + ' is down!',
            text: 'Alert: ' + checkName + ' is down'
        };
        emailClient.sendMail(email, function(err) {
            if (err) console.log(err);
        });
    }
};
