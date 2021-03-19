const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const template_controller = require("../src/controllers/template.controller");
// const template_validator = require("../src/middlewares/template.validator");

router.route("/")
    .post(
        // validate(template_validator.create),
        // asynchandler(template_validator.recurrent),
        asynchandler(template_controller.create)
    )
    .get(asynchandler(template_controller.list));

router.route("/:id")
    .get(asynchandler(template_controller.getById))
    .delete(asynchandler(template_controller.remove));

module.exports = router;