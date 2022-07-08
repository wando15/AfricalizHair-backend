const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { Mailer } = require("../../helpers/mailer");
const ApiError = require("../../helpers/APIError");
const config = require("../../config/server-config");
const { UserController } = require("../controllers");
const { UserRepository } = require("../repositories");
const Model = require("../models");

async function CreateUserFactory(req, res, next) {
    const userRepository = UserRepository(Model.User);    
    const userController = UserController({ userRepository, bcrypt, config, ApiError });

    const result = await userController
        .create(req, res, next);

    res.result = result;
    next();
}

module.exports = { CreateUserFactory };