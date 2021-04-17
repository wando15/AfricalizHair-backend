const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const order_item_controller = require("../src/controllers/order_item.controller");
const order_item_validator = require("../src/middlewares/order_item.validator");
const order_validator = require("../src/middlewares/order.validator");
const product_validator = require("../src/middlewares/product.validator");
const service_validator = require("../src/middlewares/service.validator");

router.route("/:id")
    .post(
        validate(order_item_validator.create),
        asynchandler(order_item_validator.recurrent),
        asynchandler(order_validator.existence),
        asynchandler(product_validator.existence),
        asynchandler(service_validator.existence),
        asynchandler(order_item_controller.create)
    )
    .get(asynchandler(order_item_controller.list))
    .put(
        validate(order_item_validator.update),
        asynchandler(order_item_validator.recurrent),
        asynchandler(order_validator.existence),
        asynchandler(product_validator.existence),
        asynchandler(service_validator.existence),
        asynchandler(order_item_controller.update)
    )
    .delete(asynchandler(order_item_controller.remove));

module.exports = router;