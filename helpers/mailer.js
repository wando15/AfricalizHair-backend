const nodemailer = require("nodemailer");
const { MAILER } = require("../config/server-config");
const APIError = require("./APIError");
const Template = require('../src/controllers/template.controller');

const transporter = nodemailer.createTransport(MAILER);


async function sendForgot(mail_options, next) {

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
                return next(new APIError("could not send reset code", 422, true));
            } else {
                console.log("email sent:\n", response);
                return next(new APIError("Reset Code sent", 422, true));
            }
        });
    } catch (exception) {
        console.log(error);
        return next(new APIError("could not sent reset code", 500, true, exception));
    }
}


module.exports = {
    sendForgot
}