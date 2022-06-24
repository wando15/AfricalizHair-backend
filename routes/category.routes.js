const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const category_controller = require("../src/controllers/category.controller");
const category_validator = require("../src/Validators/category.validator");

router.route("/")
    .post(
        validate(category_validator.create),
        asynchandler(category_validator.recurrent),
        asynchandler(category_controller.create)
    )
    .get(asynchandler(category_controller.list));

router.route("/:id")
    .get(asynchandler(category_controller.getById))
    .put(
        validate(category_validator.update),
        asynchandler(category_controller.update)
    )
    .delete(asynchandler(category_controller.remove));

module.exports = router;