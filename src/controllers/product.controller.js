const product_repository = require("../repositories/product.repository");

const messages = {
    success_create: "Product created successfully",
    error_create: "Failed to create product",
    ok_found: "Product located successfully",
    ok_found_list: "Product list successfully retrieved",
    not_found: "Not found product",
    error_found: "Failed to recover product",
    success_remove:"Product removed successfully",
    error_remove: "Failed to remove product",    
    success_updated: "Product updated successfully",
    error_updated: "Failed to update product",
}

async function create(req, res, next) {
    try {
        const product_request = req.body;

        const new_product = await product_repository.create(product_request);
        
        if(!new_product){
            throw (new Error(messages.error_create, 422, true));
        }

        res.status(200).json({
            message:messages.success_create,
            product: new_product
        })
    }
    catch (exception) {
        throw (new Error(messages.error_create, 500, true, exception));
    }
}

async function list(req, res, next) {
    try {
        const list_products = await product_repository.list(req.query);
        
        if(!list_products || list_products.length < 1 ){
            throw (new Error(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_products
        });
    }
    catch (exception) {
        throw (new Error(messages.error_found, 500, true, exception));
    }
}

async function getById(req, res, next) {
    try {
        const product = await product_repository.getById(req.params.id);

        if(!product){
            throw (new Error(messages.not_found, 404, true));
        }

        res.status(200).json({
            message:messages.ok_found,
            product
        });
    }
    catch (exception) {
        throw (new Error(messages.error_found, 500, true, exception));
    }
}

async function update(req, res, next) {
    try {
        const product_request = req.body;

        const product = await product_repository.getById(req.params.id);

        if(!product){
            throw (new Error(messages.not_found, 404, true));
        }

        const updated_product = await product_repository.update(product, product_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_product
        });
    }
    catch (exception) {
        throw (new Error(messages.error_updated, 500, true, exception));
    }
}

async function remove(req, res, next) {
    try {
        const product = await product_repository.getById(req.params.id);

        if(!product){
            throw (new Error(messages.not_found, 404, true));
        }

        await product_repository.remove(product);

        res.status(200).json({
            message: messages.success_remove,
        });
    }
    catch (exception) {
        throw (new Error(messages.error_remove, 500, true, exception));
    }
}

module.exports = {
    create,
    list,
    getById,
    remove, 
    update
}