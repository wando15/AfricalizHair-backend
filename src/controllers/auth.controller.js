
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const user_repository = require("../repositories/user.repository");
const auth_repository = require("../repositories/auth.repository");
const config = require("../../config/server-config");
const mailer = require("../../helpers/mailer");
const APIError = require("../../helpers/APIError");

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
    try {
        const { email, pass } = req.body;
        const user = await user_repository.getByEmail(email);

        if (!user) {
            throw (new APIError(messages.error_login, 422, true));
        }

        let passwordCheck = bcrypt.compareSync(pass, user.pass);

        if (!passwordCheck) {
            throw (new APIError(messages.error_login, 422, true));
        }

        const session = {
            email: user.email,
            full_name: user.name + " " + user.last_name,
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
    catch (exception) {
        return next(exception)
    }
}

async function logout(req, res, next) {
    try {
        const { user } = req.session;
        user.time_out = new Date();

        const auth = await auth_repository.getById(user.id);

        if (!auth) {
            throw (new APIError(messages.error_logout, 500, true));
        }

        await auth_repository.update(auth, user);

        delete req.session.user; // any of these works
        req.session.destroy();

        res.status(200).json({
            message: messages.success_logout
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function forgot(req, res, next) {
    try {
        const { email } = req.params;
        let user = await user_repository.getByEmail(email);

        if (!user) {
            throw (new APIError(messages.not_found, 404, true));
        }

        const user_request = {};
        user_request.pass_resset_key = shortid.generate();
        user_request.pass_key_expires = new Date().getTime() + 20 * 60 * 1000

        user = await user_repository.update(user, user_request);

        if (!user) {
            throw (new APIError(messages.error_forgot, 404, true));
        }

        mailer.send({
            to: user.email,
            template_id: 'forgot_password',
            params: {
                name: user.name,
                code: user.pass_resset_key
            }
        }, next);

        res.status(200).json({
            message: messages.success_forgot + " " + user.email
        });
    } catch (Exception) {
        return next(exception)
    }
}

async function reset(req, res, next) {
    try {
        const { key } = req.query;
        const { new_pass } = req.body;

        let user = await user_repository.getByRessetKey(key);

        if (!user) {
            throw (new APIError(messages.error_key, 404, true));
        }

        const now = new Date().getTime();
        const key_expiration = user.pass_key_expires;

        if (key_expiration < now) {
            throw (new APIError(messages.error_key_expiration, 500, true));
        }

        const updated_user = {};
        updated_user.pass = bcrypt.hashSync(new_pass, config.bcrypt.NUMBER_CRIPTY);

        updated_user.pass_resset_key = null;
        updated_user.pass_key_expires = null;

        user = await user_repository.update(user, updated_user);

        if (!user) {
            throw (new APIError(messages.error_reset, 500, true));
        }

        res.status(200).json({
            message: messages.success_reset
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function list(req, res, next) {
    try {
        const list_auths = await auth_repository.list(req.query);

        if (!list_auths || list_auths.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_auths
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function getById(req, res, next) {
    try {
        const auth = await auth_repository.getById(req.params.id);

        if (!auth) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found,
            auth
        });
    }
    catch (exception) {
        return next(exception)
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