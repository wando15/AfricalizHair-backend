const Joi = require("joi");
const user_repository = require("../repositories/user.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    name: "fail with Name.",
    last_name: "fail with Last name.",
    email: "fail with email."
}

const body = {
    user: {
        name: Joi.string().required().error(() => messages.name),
        last_name: Joi.string().required().error(() => messages.last_name),
        email: Joi.string().email().required().error(() => messages.email),
        // profile_id: Joi.number().required()
    }
}

const create = {
    body
};

const update = {
    body
};

async function recurrent(req, res, next) {
    try {
        req.body.name = req.body.name.substring(0, 1).toUpperCase().concat(req.body.name.substring(1));
        const request = req.body;
        const already = await user_repository.list({ name: request.name, email: request.email });

        if (already && already[0].id != req.params.id) {
            throw (new APIError("user already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(exception)
    }
}

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await user_repository.getById(request.user_id);

        if (!already) {
            throw (new APIError("user not found", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(exception)
    }
}

module.exports = {
    create,
    update,
    existence,
    recurrent
}