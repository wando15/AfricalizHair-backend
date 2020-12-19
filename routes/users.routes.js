const express = require('express');
const router = express.Router();
const asynchandler = require("express-async-handler");
const user_controller = require("../controllers/users.controllers");

router.route('/')
    .post(asynchandler(user_controller.create))
    .get(() => { });

router.route('/{id}')
    .get(() => { })
    .put(() => { });

module.exports = router;