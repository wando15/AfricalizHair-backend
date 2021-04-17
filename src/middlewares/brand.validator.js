const Joi = require("joi");
const brand_repository = require("../repositories/brand.repository");
const APIError = require("../../helpers/APIError");

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

        if (already && already[0].id != req.params.id) {
            throw (new APIError("brand already exist", 422, true));
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
        const already = await brand_repository.getById(request.brand_id);

        if (!already) {
            throw (new APIError("brand not found", 422, true));
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