const order_item_repository = require("../repositories/order_item.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Order item created successfully",
    error_create: "Failed to create order item",
    ok_found: "Order item located successfully",
    ok_found_list: "Order item list successfully retrieved",
    not_found: "Not found order item",
    error_found: "Failed to recover order item",
    success_remove: "Order item removed successfully",
    error_remove: "Failed to remove order item",
    success_updated: "Order item updated successfully",
    error_updated: "Failed to update order item",
}

async function create(req, res, next) {
    try {
        const order_item_request = req.body;

        const new_order_item = await order_item_repository.create(order_item_request);

        if (!new_order_item) {
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message: messages.success_create,
            order_item: new_order_item
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function list(req, res, next) {
    try {
        var query = { order_id: req.params.id };
        const order_item_list = await order_item_repository.list(query);

        if (!order_item_list || order_item_list.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            order_item_list
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function update(req, res, next) {
    try {
        const order_item_request = req.body;

        const order_item = await order_item_repository.getById(req.params.id);

        if (!order_item) {
            throw (new APIError(messages.not_found, 404, true));
        }

        const updated_order_item = await order_item_repository.update(order_item, order_item_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_order_item
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function remove(req, res, next) {
    try {
        const order_item = await order_item_repository.getById(req.params.id);

        if (!order_item) {
            throw (new APIError(messages.not_found, 404, true));
        }

        await order_item_repository.remove(order_item);

        res.status(200).json({
            message: messages.success_remove,
        });
    }
    catch (exception) {
        return next(exception)
    }
}

module.exports = {
    create,
    list,
    getById,
    remove,
    update
}