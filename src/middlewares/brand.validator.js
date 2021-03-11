const Joi = require("joi");
const APIError = require("../../helpers/APIError");
const brand_repository = require("../repositories/brand.repository");

const messages = {
    name: "fail with Name.",
    desription: "fail with desription.",
    email: "fail with email.",
    phone: "fail with phone."
}

const body = {
    brand: {
        name: Joi.string().required().error(() => messages.name),
        desription: Joi.string().required().error(() => messages.desription),
        email: Joi.boolean().required().error(() => messages.email),
        phone: Joi.string().email().required().error(() => messages.phone)
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
        const already = await brand_repository.list({ name: request.name});

        if (already && already.id != request.id) {
            return next(new APIError("brand already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to create brand", 500, true, exception));
    }
}

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await brand_repository.getById(request.brand_id);

        if (!already) {
            return next(new APIError("brand not found", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to verify brand", 500, true, exception));
    }
}

module.exports = {
    create,
    update,
    existence,
    recurrent
}