const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const product_controller = require("../src/controllers/product.controller");
const product_validator = require("../src/middlewares/product.validator");

router.route("/")
    .post(
        validate(product_validator.create),
        asynchandler(product_validator.recurrent),
        asynchandler(product_controller.create)
    )
    .get(asynchandler(product_controller.list));

router.route("/:id")
    .get(asynchandler(product_controller.getById))
    .put(
        validate(product_validator.update),
        asynchandler(product_controller.update)
    )
    .delete(asynchandler(product_controller.remove));

module.exports = router;