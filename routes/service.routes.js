const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const service_controller = require("../src/controllers/service.controller");
const service_validator = require("../src/middlewares/service.validator");

router.route("/")
    .post(
        validate(service_validator.create),
        asynchandler(service_validator.recurrent),
        asynchandler(service_controller.create)
    )
    .get(asynchandler(service_controller.list));

router.route("/:id")
    .get(asynchandler(service_controller.getById))
    .put(
        validate(service_validator.update),
        asynchandler(service_validator.recurrent),
        asynchandler(service_controller.update)
    )
    .delete(asynchandler(service_controller.remove));

module.exports = router;