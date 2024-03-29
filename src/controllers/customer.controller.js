const customer_repository = require("../repositories/customer.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Customer created successfully",
    error_create: "Failed to create customer",
    ok_found: "Customer located successfully",
    ok_found_list: "Customer list successfully retrieved",
    not_found: "Not found customer",
    error_found: "Failed to recover customer",
    success_remove: "Customer removed successfully",
    error_remove: "Failed to remove customer",
    success_updated: "Customer updated successfully",
    error_updated: "Failed to update customer",
}

async function create(req, res, next) {
    try {
        const customer_request = req.body;

        const new_customer = await customer_repository.create(customer_request);

        if (!new_customer) {
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message: messages.success_create,
            customer: new_customer
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function list(req, res, next) {
    try {
        const list_customers = await customer_repository.list(req.query);

        if (!list_customers || list_customers.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_customers
        });
    }
    catch (exception) {
        return next(exception);
    }
}

async function getById(req, res, next) {
    try{
    const customer = await customer_repository.getById(req.params.id);

    if (customer) {
        throw new APIError(messages.not_found, 404, true);
    }

    res.status(200).json({
        message: messages.ok_found,
        customer
    });
        
}
catch (exception) {
    return next(exception);
}
}

async function update(req, res, next) {
    try {
        const customer_request = req.body;

        const customer = await customer_repository.getById(req.params.id);

        if (!customer) {
            throw (new APIError(messages.not_found, 404, true));
        }

        const updated_customer = await customer_repository.update(customer, customer_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_customer
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function remove(req, res, next) {
    try {
        const customer = await customer_repository.getById(req.params.id);

        if (!customer) {
            throw (new APIError(messages.not_found, 404, true));
        }

        await customer_repository.remove(customer);

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