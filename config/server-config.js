module.exports = {
    PORT: 3000, 
    SESSION:{
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized:true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false
    },
    bcrypt:{
        NUMBER_CRIPTY:10
    }
}