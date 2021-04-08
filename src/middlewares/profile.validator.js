const Joi = require("joi");
const profile_repository = require("../repositories/profile.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    name: "fail with Name.",
    description: "fail with Description."
}

const body = {
    profile: {
        name: Joi.string().required().error(() => messages.name),
        description: Joi.string().required().error(() => messages.description)
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
        const already = await profile_repository.list({ name: request.name });

        if (already && already.id != request.id) {
            throw (new APIError("profile already exist", 422, true));
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
        const already = await profile_repository.getById(request.profile_id);

        if (!already) {
            throw (new APIError("profile not found", 422, true));
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