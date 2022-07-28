const express = require("express");
const app = express();
const session = require('express-session');
const routes = require("./routes/index.routes");
const { PORT, SESSION } = require("./config/server.config");
const { isEmptyObject } = require("./helpers/ObjectTools");
const APIError = require("./helpers/APIError");

app.get("/status", (req, res) => {
    res.send
        ("Servidor Online! :)");
})
    .use(express.json())
    .use(
        session(SESSION)
    )
    .use((req, res, next) => {
        console.log('=====================METHOD======================');
        console.log(req.protocol + ' | ' + req.method + ' | ' + req.url);
        if (!isEmptyObject(req.body)) {
            console.log('=====================BODY========================');
            console.log(req.body);
        }

        console.log('=================================================');
        console.log(new Date() + '');
        console.log('=================================================');
        next();
    })
    .use("/", routes)
    .use((err, req, res, next) => {
        if (!err instanceof APIError) {
            return next(new APIError(err.message, 500, true, err));
        }
        next(err);
    })
    .use((req, res) => {
        if (res?.result?.error) {
            return res.status(500).json({ error: res.result.error })
        }
        res.status(200).json(res.result)
    })
    .use((err, req, res) => {
        console.error(err.stack);
        res.status(err.status).json({
            code: err.status,
            message: err.message,
            stack: err.stack
        });
    })
    .listen(PORT, () => {
        console.log(`run: http://localhost:${PORT}`);
    });
