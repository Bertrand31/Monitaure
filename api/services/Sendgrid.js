const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const config = require('../../config/local');

const appEmail = config.emailAddress;

const sendgridOptions = {
    auth: {
        api_user: config.sendgridUsername,
        api_key: config.sendgridPassword,
    },
};

const emailClient = nodemailer.createTransport(sgTransport(sendgridOptions));

module.exports = {
    /**
     * Send an email through Sendgrid
     * @param {String} userEmail - the email address we will be sending to
     * @param {String} emailObject - the object of the email
     * @param {String} emailBody - the body of the email
     */
    send(userEmail, emailObject, emailBody) {
        const emailOptions = {
            from: `"Monitaure" <${appEmail}>`,
            to: userEmail,
            subject: emailObject,
            html: emailBody,
        };
        emailClient.sendMail(emailOptions, (err) => {
            if (err) return sails.log.error(err);
        });
    },
};
