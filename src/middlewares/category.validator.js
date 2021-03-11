const Joi = require("joi");
const APIError = require("../../helpers/APIError");
const category_repository = require("../repositories/category.repository");

const messages = {
    name: "fail with Name.",
    desription: "fail with desription."
}

const body = {
    category: {
        name: Joi.string().required().error(() => messages.name),
        desription: Joi.string().required().error(() => messages.desription)
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
        const already = await category_repository.list({ name: request.name});

        if (already && already.id != request.id) {
            return next(new APIError("category already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to create category", 500, true, exception));
    }
}

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await category_repository.getById(request.category_id);

        if (!already) {
            return next(new APIError("category not found", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to verify category", 500, true, exception));
    }
}

module.exports = {
    create,
    update,
    existence,
    recurrent
}