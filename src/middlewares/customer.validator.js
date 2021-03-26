const Joi = require("joi");
const customer_repository = require("../repositories/customer.repository");

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

        if (already && already.id != request.id) {
            throw (new Error("customer already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        throw (new Error("Failed to create customer", 500, true, exception));
    }
}

async function existence(req, res, next) {
    try {
        const request = req.body;
        const already = await customer_repository.getById(request.customer_id);

        if (!already) {
            throw (new Error("customer not found", 422, true));
        }

        next();
    }
    catch (exception) {
        throw (new Error("Failed to verify customer", 500, true, exception));
    }
}

module.exports = {
    create,
    update,
    existence,
    recurrent
}