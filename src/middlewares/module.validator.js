const Joi = require("joi");
const APIError = require("../../helpers/APIError");
const module_repository = require("../repositories/module.repository");

const messages = {
    name: "fail with Name.",
    description: "fail with Description."
}

const body = {
    module: {
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
        let request = req.body;

        let already = await module_repository.list({ name: request.name });

        if (already && already.id != request.id) {
            return next(new APIError("module already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to create module", 500, true, exception));
    }
}

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await module_repository.getById(request.module_id);

        if (!already) {
            return next(new APIError("module not found", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to verify module", 500, true, exception));
    }
}

module.exports = {
    create,
    update,
    existence,
    recurrent
}