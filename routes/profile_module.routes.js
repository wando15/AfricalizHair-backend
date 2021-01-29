const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const profile_module_controller = require("../src/controllers/profile_module.controller");
const profile_module_validator = require("../src/middlewares/profile_module.validator");

router.route("/")
    .post(
        validate(profile_module_validator.add),
        asynchandler(profile_module_validator.recurrent),
        asynchandler(profile_module_controller.add)
    )
    .delete(
        validate(profile_module_validator.remove),
        asynchandler(profile_module_controller.remove)
        );

module.exports = router;