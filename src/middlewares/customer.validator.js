const Joi = require("joi");
const APIError = require("../../helpers/APIError");
const customer_repository = require("../repositories/customer.repository");

const messages = {
    name: "fail with Name.",
    last_name: "fail with Last name.",
    phone: "fail with Last phone.",
    email: "fail with Last email.",
}

const body = {
    customer: {
        name: Joi.string().required().error(() => messages.name),
        last_name: Joi.string().required().error(() => messages.last_name),
        phone: Joi.string().required().error(() => messages.last_name),
        email: Joi.string().email().required().error(() => messages.last_name)
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
        const already = await customer_repository.list({ email: request.email});

        if (already) {
            return next(new APIError("customer already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to create customer", 500, true, exception));
    }

}

module.exports = {
    create,
    update,
    existence
}