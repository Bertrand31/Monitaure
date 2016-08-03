const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendgridOptions = {
    auth: {
        api_user: sails.config.sendgridUsername,
        api_key: sails.config.sendgridPassword,
    },
};

const emailClient = nodemailer.createTransport(sgTransport(sendgridOptions));

module.exports = {
    send(emailData) {
        emailClient.sendMail(emailData, (err) => {
            if (err) return sails.log.error(err);
        });
    },
};
