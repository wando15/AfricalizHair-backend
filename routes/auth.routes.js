const express = require("express");
const router = express.Router();
const router_login = express.Router();
const asynchandler = require("express-async-handler");
const auth_controller = require("../src/controllers/auth.controller");

router_login.route("/login")
    .post(
        asynchandler(auth_controller.login)
    );

router_login.route("/forgot/:email")
    .post(
        asynchandler(auth_controller.forgot)
    );

router.route("/logout")
    .post(
        asynchandler(auth_controller.logout)
    );

router_login.route("/resset")
    .post(
        asynchandler(auth_controller.reset)
    );

router.route("/")
    .get(
        asynchandler(auth_controller.list)
    );

router.route("/:id")
    .get(
        asynchandler(auth_controller.getById)
    );

module.exports = {
    router_login,
    router
} 