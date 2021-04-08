const nodemailer = require("nodemailer");
const { MAILER } = require("../config/server-config");
const Template = require('../src/controllers/template.controller');
const APIError = require("./APIError");

const transporter = nodemailer.createTransport(MAILER);


async function send(mail_options, next) {

    const template = await Template.getTemplate(mail_options);
    
    const mailOptions = {
        subject: template.subject,
        to: mail_options.to,
        from: MAILER.auth.user,
        html: template.html
    }

    sender(mailOptions, next);
}

function sender(mailOptions, next) {
    try {
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log("error:\n", error, "\n");
                throw (new APIError("could not send reset code", 422, true));
            } else {
                console.log("email sent:\n", response);
                throw (new APIError("Reset Code sent", 422, true));
            }
        });
    } catch (exception) {
        console.log(error);
        throw (new APIError("could not sent reset code", 500, true, exception));
    }
}


module.exports = {
    send
}