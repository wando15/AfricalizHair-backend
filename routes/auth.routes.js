const express = require("express");
const router = express.Router();
const router_login = express.Router();
const asynchandler = require("express-async-handler");
const AuthFactory = require("../src/factories/AuthFactory")

router_login.route("/login")
    .post(
        asynchandler(AuthFactory.AuthLoginFactory)
    );

router_login.route("/forgot/:email")
    .post(
        asynchandler(AuthFactory.AuthForgotFactory)
    );

router_login.route("/resset")
    .post(
        asynchandler(AuthFactory.AuthResetFactory)
    );

router.route("/logout")
    .post(
        asynchandler(AuthFactory.AuthLogoutFactory)
    );


module.exports = {
    router_login,
    router
} 