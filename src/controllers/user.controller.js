const user_repository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const APIError = require("../../helpers/APIError");
const config = require("../../config/server-config");

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

async function load(req, res, next) {
    const user = await user_repository.getById(req.session.user.user_id);

    res.status(200).json({
        message: messages.ok_found,
        user,
        permission: user.modules
    });
}

async function create(req, res, next) {
    try {
        const user_request = req.body;
        user_request.email = user_request.email.toLowerCase();
        user_request.pass = bcrypt.hashSync(user_request.pass, config.bcrypt.NUMBER_CRIPTY);

        const new_user = await user_repository.create(user_request);

        if (!new_user) {
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message: messages.success_create,
            user: new_user
        })
    }
    catch (exception) {
        return next(exception);
    }
}

async function list(req, res, next) {
    try {
        const list_users = await user_repository.list(req.query);

        if (!list_users || list_users.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_users
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function getById(req, res, next) {
    try {
        const user = await user_repository.getById(req.params.id);

        if (!user) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found,
            user
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function update(req, res, next) {
    try {
        const user_request = req.body;

        const user = await user_repository.getById(req.params.id || req.session.user.user_id);

        if (!user) {
            throw (new APIError(messages.not_found, 404, true));
        }

        if(user_request.pass){
            user_request.pass = bcrypt.hashSync(user_request.pass, config.bcrypt.NUMBER_CRIPTY);
        }

        const updated_user = await user_repository.update(user, user_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_user
        });
    }
    catch (exception) {
        return next(exception)
    }
}


async function remove(req, res, next) {
    try {
        const user = await user_repository.getById(req.params.id);

        if (!user) {
            throw (new APIError(messages.not_found, 404, true));
        }

        await user_repository.remove(user);

        res.status(200).json({
            message: messages.success_remove,
        });
    }
    catch (exception) {
        return next(exception)
    }
}

module.exports = {
    load,
    create,
    list,
    getById,
    remove,
    update
}