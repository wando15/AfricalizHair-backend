const express = require("express");
const app = express();
const session = require('express-session');
const routes = require("./routes/index.routes");
const { PORT, SESSION } = require("./config/server-config");
const { isEmptyObject } = require("./helpers/ObjectTools");
const index_model = require("./src/models/index.model");
const APIError = require("./helpers/APIError");

app.use(express.json());

app.use(
    session(SESSION)
);

app.use((req, res, next) => {
    console.log('=====================METHOD======================');
    console.log(req.protocol + ' | ' + req.method + ' | ' + req.url);
    // console.log('=====================HEADERS=====================');
    // console.log(req.headers);

    if (!isEmptyObject(req.body)) {
        console.log('=====================BODY========================');
        console.log(req.body);
    }

    console.log('=================================================');
    console.log(new Date() + '');
    console.log('=================================================');
    next();
});

app.get("/status", (req, res) => {
    res.send("Servidor Online! :)");
});

app.use("/", routes);

app.use(function (err, req, res, next) {
    if(!err instanceof APIError){
        return next(new APIError(err.message, 500, true, err));
    }
    next(err);
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status).json({
        code: err.status,
        message: err.message,
        stack: err.stack
    });
});

app.listen(PORT, () => {
    console.log(`run port: ${PORT}`);
});