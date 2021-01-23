const Joi = require("joi");
const APIError = require("../../helpers/APIError");
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
        email: Joi.string().email().required().error(() => messages.email)
    }
}
const create = {
    body
};

const update = {
    body
};

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await user_repository.list({ name: request.name, last_name: request.last_name });

        if (already) {
            return next(new APIError("user already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to create user", 500, true, exception));
    }

}

module.exports = {
    create,
    update,
    existence
}