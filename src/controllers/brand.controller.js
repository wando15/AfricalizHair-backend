const brand_repository = require("../repositories/brand.repository");

const messages = {
    success_create: "Brand created successfully",
    error_create: "Failed to create brand",
    ok_found: "Brand located successfully",
    ok_found_list: "Brand list successfully retrieved",
    not_found: "Not found brand",
    error_found: "Failed to recover brand",
    success_remove:"Brand removed successfully",
    error_remove: "Failed to remove brand",    
    success_updated: "Brand updated successfully",
    error_updated: "Failed to update brand",
}

async function create(req, res, next) {
    try {
        const brand_request = req.body;

        const new_brand = await brand_repository.create(brand_request);
        
        if(!new_brand){
            throw (new Error(messages.error_create, 422, true));
        }

        res.status(200).json({
            message:messages.success_create,
            brand: new_brand
        })
    }
    catch (exception) {
        throw (new Error(messages.error_create, 500, true, exception));
    }
}

async function list(req, res, next) {
    try {
        const list_brands = await brand_repository.list(req.query);
        
        if(!list_brands || list_brands.length < 1 ){
            throw (new Error(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_brands
        });
    }
    catch (exception) {
        throw (new Error(messages.error_found, 500, true, exception));
    }
}

async function getById(req, res, next) {
    try {
        const brand = await brand_repository.getById(req.params.id);

        if(!brand){
            throw (new Error(messages.not_found, 404, true));
        }

        res.status(200).json({
            message:messages.ok_found,
            brand
        });
    }
    catch (exception) {
        throw (new Error(messages.error_found, 500, true, exception));
    }
}

async function update(req, res, next) {
    try {
        const brand_request = req.body;

        const brand = await brand_repository.getById(req.params.id);

        if(!brand){
            throw (new Error(messages.not_found, 404, true));
        }

        const updated_brand = await brand_repository.update(brand, brand_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_brand
        });
    }
    catch (exception) {
        throw (new Error(messages.error_updated, 500, true, exception));
    }
}

async function remove(req, res, next) {
    try {
        const brand = await brand_repository.getById(req.params.id);

        if(!brand){
            throw (new Error(messages.not_found, 404, true));
        }

        await brand_repository.remove(brand);

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