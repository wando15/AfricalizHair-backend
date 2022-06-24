const Joi = require("joi");
const order_repository = require("../repositories/order.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    value: "fail with Value.",
    payment_type: "fail with payment type.",
    status: "fail with status.",
    salesman_id: "fail with salesman.",
    customer_id: "fail with customer."
}

const body = {
    order: {
        payment_type: Joi.string().required().error(() => messages.payment_type),
        status: Joi.string().required().error(() => messages.status),
        customer_id: Joi.number().required().error(() => messages.customer_id),
        salesman_id: Joi.number().required().error(() => messages.salesman_id)
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
        const already = await order_repository.list({ customer_id: request.customer_id, status: request.status});

        if (already && already[0].id != req.params.id) {
            throw (new APIError("order already exist", 422, true));
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
        const already = await order_repository.getById(request.order_id);

        if (!already) {
            throw (new APIError("order not found", 422, true));
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