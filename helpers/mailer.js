function Mailer(Transporter, TemplateRepository, APIError) {
    async function send(mail_options, next) {

        const template = await TemplateRepository.getTemplate(mail_options);

        const mail = {
            subject: template.subject,
            to: mail_options.to,
            from: MAILER.auth.user,
            html: template.html
        }

        sender(mail, next);
    }

    function sender(mail, next) {
        try {
            Transporter.sendMail(mailOptions, (error, response) => {
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
}

module.exports = { Mailer }