
const APIError = require("../../helpers/APIError");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const user_repository = require("../repositories/user.repository");
const auth_repository = require("../repositories/auth.repository");
const config = require("../../config/server-config");
const mailer = require("../../helpers/mailer");

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

async function login(req, res, next) {
    const { email, pass } = req.body;
    const user = await user_repository.getByEmail(email);

    if (!user) {
        return next(new APIError(messages.error_login, 422, true));
    }

    let passwordCheck = bcrypt.compareSync(pass, user.pass);

    if (!passwordCheck) {
        return next(new APIError(messages.error_login, 422, true));
    }

    const session = {
        email: user.email,
        full_name: user.name + " " + user.lest_name,
        user_id: user.id,
        expires: new Date(Date.now() + 24 * 3600 * 1000),
        time_in: new Date()
    };

    req.session.user = await auth_repository.create(session);

    res.status(200).json({
        message: messages.success_login,
        user: user
    });
}

async function logout(req, res, next) {
    try {
        const { user } = req.session;
        user.time_out = new Date();

        const auth = await auth_repository.getById(user.id);

        if (!auth) {
            return next(new APIError(messages.error_logout, 500, true));
        }

        await auth_repository.update(auth, user);

        delete req.session.user; // any of these works
        req.session.destroy();

        res.status(200).json({
            message: messages.success_logout
        });
    }
    catch (exception) {
        return next(new APIError(messages.error_logout, 500, true, exception));
    }
}

async function forgot(req, res, next) {
    const { email } = req.params;
    let user = await user_repository.getByEmail(email);

    if (!user) {
        return next(new APIError(messages.not_found, 404, true));
    }

    const forgot_user = user;

    forgot_user.pass_reset_key = shortid.generate();
    forgot_user.pass_key_expires = new Date().getTime() + 20 * 60 * 1000

    user = await user_repository.update(user, forgot_user);

    if (!user) {
        return next(new APIError(messages.error_forgot, 404, true));
    }

    mailer.sendForgot(user, next);

    res.status(200).json({
        message: messages.success_forgot + " " + user.email
    });
}

async function reset(req, res, next) {
    try {
        const { email, pass_reset_key } = req.params;

        let user = await user_repository.getByEmail(email);

        if (!user.pass_reset_key === pass_reset_key) {
            return next(new APIError(messages.not_found, 404, true));
        }

        if (user) {
            return next(new APIError(messages.not_found, 404, true));
        }

        const now = new Date().getTime();
        const key_expiration = user.pass_key_expires;

        if (key_expiration > now) {
            user.pass = bcrypt.hashSync(new_pass, config.bcrypt.NUMBER_CRIPTY);

            user.pass_reset_key = undefined;
            user.key_expiration = undefined;

            user = await user_repository.update(user, user);

            if (!user) {
                res.status(200).json({
                    message: messages.success_reset
                });
            } else {
                return next(new APIError(messages.error_reset, 500, true));
            }
        }
        else {
            return next(new APIError(messages.error_key_expiration, 500, true));
        }
    }
    catch (exception) {
        return next(new APIError(messages.error_reset, 500, true, exception));
    }
}

async function list(req, res, next) {
    try {
        const list_auths = await auth_repository.list(req.query);

        if (!list_auths || list_auths.length < 1) {
            return next(new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_auths
        });
    }
    catch (exception) {
        return next(new APIError(messages.error_found, 500, true, exception));
    }
}

async function getById(req, res, next) {
    try {
        const auth = await auth_repository.getById(req.params.id);

        if (!auth) {
            return next(new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found,
            auth
        });
    }
    catch (exception) {
        return next(new APIError(messages.error_found, 500, true, exception));
    }
}

module.exports = {
    login,
    logout,
    forgot,
    reset,
    list,
    getById
}