const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const profile_controller = require("../src/controllers/profile.controller");
const profile_validator = require("../src/middlewares/profile.validator");
const profile_module_routes = require("./profile_module.routes");

router.use("/module", profile_module_routes);

router.route("/")
    .post(
        validate(profile_validator.create),
        asynchandler(profile_validator.recurrent),
        asynchandler(profile_controller.create)
    )
    .get(asynchandler(profile_controller.list));

router.route("/:id")
    .get(asynchandler(profile_controller.getById))
    .put(
        validate(profile_validator.update),
        asynchandler(profile_validator.recurrent),
        asynchandler(profile_controller.update)
    )
    .delete(asynchandler(profile_controller.remove));

module.exports = router;