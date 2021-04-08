const Joi = require("joi");
const category_repository = require("../repositories/category.repository");
const APIError = require("../../helpers/APIError");

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
            throw (new APIError("category already exist", 422, true));
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
        const already = await category_repository.getById(request.category_id);

        if (!already) {
            throw (new APIError("category not found", 422, true));
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