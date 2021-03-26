const express = require("express");
const app = express();
const session = require('express-session');
const routes = require("./routes/index.routes");
const { PORT, SESSION } = require("./config/server-config");
const { isEmptyObject } = require("./helpers/ObjectTools");
const index_mode = require("./src/models/index.model");

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

app.listen(PORT, () => {
    console.log(`run port: ${PORT}`);
});