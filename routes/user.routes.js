const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const user_validator = require("../src/Validators/user.validator");
const { CreateUserFactory, UpdateUserFactory, DeleteUserFactory, GetUserFactory, GetListUserFactory } = require("../src/Factories/UserFactory");

// router.route("/load")
//     .post(asynchandler(user_controller.load));

router.route("/")
    .post(
        validate(user_validator.create),
        asynchandler(CreateUserFactory)
    )
    .get(
        asynchandler(GetListUserFactory)
    );

router.route("/:id")
    .get(
        asynchandler(GetUserFactory)
    )
    .put(
        validate(user_validator.update),
        asynchandler(UpdateUserFactory)
    )
    .delete(
        asynchandler(DeleteUserFactory)
    );

module.exports = router;