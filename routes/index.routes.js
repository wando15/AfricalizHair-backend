const express = require('express');
const router = express.Router();
const users_routes = require('./users.routes');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log(
        '\n=====================METHOD======================\n',
        req.protocol + ' | ' + req.method + ' | ' + req.url,
        '\n=====================BODY========================\n',
        req.body,
        '\n=====================HEADERS=====================\n',
        new Date() + '',
        '\n=================================================\n');
    next();
});

router.use('/users', users_routes);

module.exports = router;