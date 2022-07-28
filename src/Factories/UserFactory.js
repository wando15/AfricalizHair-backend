const ApiError = require("../../helpers/APIError")
const bcrypt = require("bcrypt");
const config = require("../../config/server.config");
const { UserController } = require("../controllers");
const { UserRepository } = require("../repositories");
const { User } = require("../models");
const userRepository = UserRepository(User);
const userController = UserController({ userRepository, bcrypt, config, ApiError });

const messages = {
    success_create: "User created successfully",
    error_create: "Failed to create user",
    ok_found: "User located successfully",
    ok_found_list: "User list successfully retrieved",
    not_found: "Not found user",
    error_found: "Failed to recover user",
    success_remove: "User removed successfully",
    error_remove: "Failed to remove user",
    success_updated: "User updated successfully",
    error_updated: "Failed to update user",
}

async function CreateUserFactory(req, res, next) {
    try {
        const result = await userController
            .create(req, res, next);

        res.result = {
            status: 201,
            message: messages.success_create,
            user: result[0]
        };
        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_create, status: 500, exception };
    }
}

async function UpdateUserFactory(req, res, next) {
    try {
        const result = await userController
            .update(req, res, next);

        res.result = {
            status: 200,
            message: messages.success_updated,
            user: result[0]
        };

        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_updated, status: 500, exception };
    }
}

async function DeleteUserFactory(req, res, next) {
    try {
        const result = await userController
            .remove(req, res, next);

            res.result = {
                status: 200,
                message: messages.success_remove,
                user: result[0]
            };
            
        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_updated, status: 500, exception };
    }
}

async function GetUserFactory(req, res, next) {
    try {
        const result = await userController
            .getById(req, res, next);

            res.result = {
                status: 200,
                message: messages.ok_found,
                user: result
            };
            
        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_updated, status: 500, exception };
    }
}

async function GetListUserFactory(req, res, next) {
    try {
        const result = await userController
            .list(req, res, next);

            res.result = {
                status: 200,
                message: messages.ok_found_list,
                user: result
            };
            
        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_updated, status: 500, exception };
    }
}

module.exports = {
    CreateUserFactory,
    UpdateUserFactory,
    DeleteUserFactory,
    GetUserFactory,
    GetListUserFactory
};