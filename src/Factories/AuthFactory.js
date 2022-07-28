const ApiError = require("../../helpers/APIError")
const mailer = require("../../helpers/mailer");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const config = require("../../config/server.config");
const { AuthController } = require("../controllers");
const { AuthRepository, UserRepository } = require("../repositories");
const { User, Auth } = require("../models");
const authRepository = AuthRepository(Auth);
const userRepository = UserRepository(User);
const authController = AuthController({ userRepository, authRepository, bcrypt, shortid, config, mailer, ApiError });

const messages = {
    success_login: "login successfully",
    error_login: "incorrect username or password",
    success_logout: "logout successful",
    error_logout: "logout failed",
    success_reset: "Password reset successful",
    error_reset: "error resetting your password",
    success_forgot: "password recovery email sent to",
    error_forgot: "error recovering password",
    ok_found: "Authentication located successfully",
    ok_found_list: "Authentication list successfully retrieved",
    not_found: "Not found authentication",
    error_found: "Failed to recover authentication",
    error_key_expiration: "sorry, pass key has expired. Please initiate the request for a new one",
    error_key: "invalid recovery key",
    not_found: "no user found"
}

async function AuthLoginFactory(req, res, next) {
    try {
        const result = await authController
            .login(req, res, next);

        res.result = {
            status: 201,
            message: messages.success_login,
            auth: result
        };
        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_login, status: 500, exception };
    }
}

async function AuthLogoutFactory(req, res, next) {
    try {
        const result = await authController
            .logout(req, res, next);

        res.result = {
            status: 200,
            message: messages.success_logout
        };

        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_logout, status: 500, exception };
    }
}

async function AuthForgotFactory(req, res, next) {
    try {
        const { email } = req.params;
        const result = await authController
            .forgot(req, res, next);

        res.result = {
            status: 200,
            message: messages.success_forgot + " " + email
        };

        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_forgot, status: 500, exception };
    }
}

async function AuthResetFactory(req, res, next) {
    try {
        const result = await authController
            .reset(req, res, next);

        res.result = {
            status: 200,
            message: messages.success_reset
        };

        next();
    }
    catch (exception) {
        console.error({ exception })
        throw { message: messages.error_updated, status: 500, exception };
    }
}


module.exports = {
    AuthResetFactory,
    AuthForgotFactory,
    AuthLogoutFactory,
    AuthLoginFactory
};