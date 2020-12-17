const express = require('express');
const router = express.Router();
const users_routes = require('./users.routes');

router.get('/users', users_routes);

module.exports = router;