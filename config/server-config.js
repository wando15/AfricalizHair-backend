module.exports = {
    PORT: 8080,
    SESSION: {
        secret: "iy98hcbh489n38984y4h498", // don't put this into your code at production.  Try using saving it into environment variable or a config file.
        resave: true,
        saveUninitialized: false
    },
    bcrypt: {
        NUMBER_CRIPTY: 5
    },
    MAILER: {
        service: "gmail",
        port: 465,
        auth: {
            user: '', // your gmail address
            pass: '' // your gmail password
        }
    }
}