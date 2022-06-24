const Joi = require("joi");
const service_repository = require("../repositories/service.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    name: "fail with Name.",
    desription: "fail with desription.",
    price: "fail with price."
}

const body = {
    service: {
        name: Joi.string().required().error(() => messages.name),
        desription: Joi.string().required().error(() => messages.desription),
        price: Joi.number().required().error(() => messages.price)
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
        const already = await service_repository.list({ name: request.name});

        if (already && already[0].id != req.params.id) {
            throw (new APIError("service already exist", 422, true));
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
        const already = await service_repository.getById(request.service_id);

        if (!already) {
            throw (new APIError("service not found", 422, true));
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