const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const module_controller = require("../src/controllers/module.controller");
const module_validator = require("../src/middlewares/module.validator");

router.route("/")
    .post(
        validate(module_validator.create),
        asynchandler(module_validator.recurrent),
        asynchandler(module_controller.create)
    )
    .get(asynchandler(module_controller.list));

router.route("/:id")
    .get(asynchandler(module_controller.getById))
    .put(
        validate(module_validator.update),
        asynchandler(module_validator.recurrent),
        asynchandler(module_controller.update)
    )
    .delete(asynchandler(module_controller.remove));

module.exports = router;