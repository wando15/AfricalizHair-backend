const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const customer_controller = require("../src/controllers/customer.controller");
const customer_validator = require("../src/middlewares/customer.validator");

router.route("/")
    .post(
        validate(customer_validator.create),
        asynchandler(customer_validator.existence),
        asynchandler(customer_controller.create)
    )
    .get(asynchandler(customer_controller.list));

router.route("/:id")
    .get(asynchandler(customer_controller.getById))
    .put(
        validate(customer_validator.update),
        asynchandler(customer_controller.update)
    )
    .delete(asynchandler(customer_controller.remove));

module.exports = router;