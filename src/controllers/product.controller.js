const product_repository = require("../repositories/service.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Product created successfully",
    error_create: "Failed to create product",
    ok_found: "Product located successfully",
    ok_found_list: "Product list successfully retrieved",
    not_found: "Not found product",
    error_found: "Failed to recover product",
    success_remove: "Product removed successfully",
    error_remove: "Failed to remove product",
    success_updated: "Product updated successfully",
    error_updated: "Failed to update product",
}

async function create(req, res, next) {
    const product_request = req.body;

    const new_product = await product_repository.create(product_request);

    if (!new_product) {
        throw (new APIError(messages.error_create, 422, true));
    }

    res.status(200).json({
        message: messages.success_create,
        product: new_product
    })
}

module.exports = { create }