const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const brand_controller = require("../src/controllers/brand.controller");
const brand_validator = require("../src/Validators/brand.validator");

router.route("/")
    .post(
        validate(brand_validator.create),
        asynchandler(brand_validator.recurrent),
        asynchandler(brand_controller.create)
    )
    .get(asynchandler(brand_controller.list));

router.route("/:id")
    .get(asynchandler(brand_controller.getById))
    .put(
        validate(brand_validator.update),
        asynchandler(brand_controller.update)
    )
    .delete(asynchandler(brand_controller.remove));

module.exports = router;