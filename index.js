const express = require("express");
const app = express();
const routes = require("./routes/index.routes");
const { PORT } = require("./config/server-config");
const bodyParser = require("body-parser");
const { request } = require("express");
const { isEmptyObject } = require("./helpers/ObjectTools");

app.use(bodyParser.json());

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
    // }
    next();
});

app.get("/status", (req, res) => {
    res.send("Servidor Online! :)");
});

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`run port: ${PORT}`);
});