const Joi = require("joi");
const customer_repository = require("../repositories/customer.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    name: "fail with Name.",
    last_name: "fail with Last name.",
    phone: "fail with phone.",
    email: "fail with email.",
}

const body = {
    customer: {
        name: Joi.string().required().error(() => messages.name),
        last_name: Joi.string().required().error(() => messages.last_name),
        phone: Joi.string().required().error(() => messages.phone),
        email: Joi.string().email().required().error(() => messages.email)
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
        const already = await customer_repository.list({ email: request.email});

        if (already && already[0].id != req.params.id) {
            throw (new APIError("customer already exist", 422, true));
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
        const already = await customer_repository.getById(request.customer_id);

        if (!already) {
            throw (new APIError("customer not found", 422, true));
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