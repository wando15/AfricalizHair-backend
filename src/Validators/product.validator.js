const Joi = require("joi");
const product_repository = require("../repositories/service.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    name: "fail with Name.",
    desription: "fail with desription.",
    is_real_profit: "fail with precification type.",
    price: "fail with price.",
    brand_id: "fail with brand.",
    category_id: "fail with category."
}

const body = {
    product: {
        name: Joi.string().required().error(() => messages.name),
        desription: Joi.string().required().error(() => messages.desription),
        is_real_profit: Joi.boolean().required().error(() => messages.is_real_profit),
        price: Joi.number().required().error(() => messages.price),
        brand_id: Joi.number().required().error(() => messages.brand_id),
        category_id: Joi.number().required().error(() => messages.category_id),
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
        const already = await product_repository.list({ name: request.name });

        if (already && already[0].id != req.params.id) {
            throw (new APIError("product already exist", 422, true));
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
        const already = await product_repository.getById(request.product_id);

        if (!already) {
            throw (new APIError("product not found", 422, true));
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