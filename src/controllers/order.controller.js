const order_repository = require("../repositories/order.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Order item created successfully",
    error_create: "Failed to create order item",
    ok_found: "Order item located successfully",
    ok_found_list: "Order item list successfully retrieved",
    not_found: "Not found order item",
    error_found: "Failed to recover order item",
    success_remove:"Order item removed successfully",
    error_remove: "Failed to remove order item",    
    success_updated: "Order item updated successfully",
    error_updated: "Failed to update order item",
}

async function create(req, res, next) {
    try {
        const order_request = req.body;

        const new_order = await order_repository.create(order_request);
        
        if(!new_order){
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message:messages.success_create,
            order: new_order
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function updateStep(req, res, next) {
    try {
        const status = req.query.status;
        let order = await order_repository.getById(req.params.id);
        
        if(!order){
            throw (new APIError(messages.not_found, 422, true));
        }

        order.status = status;

        const updated_order = order_repository.update(order);

        res.status(200).json({
            message:messages.success_create,
            order: updated_order
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function list(req, res, next) {
    try {
        const order_list = await order_repository.list(req.query);
        
        if(!order_list || order_list.length < 1 ){
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            order_list
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function getById(req, res, next) {
    try {
        const order = await order_repository.getById(req.params.id);

        if(!order){
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message:messages.ok_found,
            order
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function update(req, res, next) {
    try {
        const order_request = req.body;

        const order = await order_repository.getById(req.params.id);

        if(!order){
            throw (new APIError(messages.not_found, 404, true));
        }

        const updated_order = await order_repository.update(order, order_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_order
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function remove(req, res, next) {
    try {
        const order = await order_repository.getById(req.params.id);

        if(!order){
            throw (new APIError(messages.not_found, 404, true));
        }

        await order_repository.remove(order);

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
    update,
    updateStep
}
