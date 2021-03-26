const Joi = require("joi");
const user_repository = require("../repositories/user.repository");

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
        profile_id: Joi.number().required()
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
        const request = req.body;
        req.body.name = req.body.name.substring(0,1).toUpperCase().concat(req.body.name.substring(1));
        const already = await user_repository.list({ name: request.name, last_name: request.last_name });

        if (already && already.id != request.id) {
            throw (new Error("user already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        throw (new Error("Failed to create user", 500, true, exception));
    }
}

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await user_repository.getById(request.user_id);

        if (!already) {
            throw (new Error("user not found", 422, true));
        }

        next();
    }
    catch (exception) {
        throw (new Error("Failed to verify user", 500, true, exception));
    }
}

module.exports = {
    create,
    update,
    existence,
    recurrent
}