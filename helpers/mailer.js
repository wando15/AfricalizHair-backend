const nodemailer = require("nodemailer");
const { MAILER } = require("../config/server-config");
const APIError = require("./APIError");

const transporter = nodemailer.createTransport(MAILER);


function sendForgot(user, next) {

    const mailOptions = {
        subject: `Password reset`,
        to: user.email,
        from: `NodeAuthTuts ${MAILER.auth.user}`,
        html: `<h1>Hi,</h1>
                  <h2>Here is your password reset key</h2>
                  <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${pass_reset_key}</code></h4>
                  <p>Please ignore if you didn't try to reset your password on our platform</p>`
    }

    sender(mailOptions, next);
}

function sender(mailOptions, next) {
    try {
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log("error:\n", error, "\n");
                return noExtendLeft(new APIError("could not send reset code", 422, true));
            } else {
                console.log("email sent:\n", response);
                return noExtendLeft(new APIError("Reset Code sent", 422, true));
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