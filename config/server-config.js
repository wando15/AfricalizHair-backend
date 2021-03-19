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
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'wando.euu@gmail.com', // your gmail address
            pass: 'Sesario15' // your gmail password
        }
    }
}