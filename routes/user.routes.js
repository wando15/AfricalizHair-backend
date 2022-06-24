const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const validate = require("express-validation");
const user_controller = require('../src/controllers/user.controller')
const user_validator = require("../src/Validators/user.validator");
const { CreateUserFactory } = require("../src/Factories/UserFactory");

router.route("/load")
    .post(asynchandler(user_controller.load));

router.route("/")
    .post(
        validate(user_validator.create),
        asynchandler(CreateUserFactory),
        (req, res) => {
            if (res.result.error) {
                return res.status(500).json({ error: res.result.error})
            }

            res.status(200) 
                .json({data: res.result.data})
        }
    )
    .put(
        validate(user_validator.update),
        asynchandler(user_controller.update)
    )
    .get(asynchandler(user_controller.list));

router.route("/:id")
    .get(asynchandler(user_controller.getById))
    .put(
        validate(user_validator.update),
        asynchandler(user_validator.existence),
        asynchandler(user_validator.recurrent),
        asynchandler(user_controller.update)
    )
    .delete(asynchandler(user_controller.remove));

module.exports = router;