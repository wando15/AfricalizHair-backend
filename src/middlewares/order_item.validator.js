const Joi = require("joi");
const order_item_repository = require("../repositories/order_item.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    value: "fail with value.",
    amount: "fail with amount."
}

const body = {
    order_item: {
        value: Joi.number().required().error(() => messages.value),
        amount: Joi.number().required().error(() => messages.amount)
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
        const already = await order_item_repository.list({ order_id: req.params.order_id });

        if (!already) {
            throw (new APIError("failed data recovery", 422, true));
        }

        let already_item;

        if (request.product_id) {
            already_item = already.find({ product_id: request.product_id, amount: request.amount });
        }
        else {
            already_item = already.find({ service_id: request.service_id, amount: request.amount });
        }

        if (already_item) {
            throw (new APIError("order item already exist", 422, true));
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
    recurrent
}