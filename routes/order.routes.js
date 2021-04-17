const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const order_controller = require("../src/controllers/order.controller");
const order_validator = require("../src/middlewares/order.validator");

router.route("/")
    .post(
        validate(order_validator.create),
        asynchandler(order_validator.recurrent),
        asynchandler(order_controller.create)
    )
    .get(asynchandler(order_controller.list));

router.route("/:id")
    .get(asynchandler(order_controller.getById))
    .put(
        validate(order_validator.update),
        asynchandler(order_validator.recurrent),
        asynchandler(order_controller.update)
    )
    .delete(asynchandler(order_controller.remove));

module.exports = router;