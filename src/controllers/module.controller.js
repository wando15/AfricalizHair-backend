const module_repository = require("../repositories/module.repository");

const messages = {
    success_create: "Modules created successfully",
    error_create: "Failed to create module",
    ok_found: "Modules located successfully",
    ok_found_list: "Modules list successfully retrieved",
    not_found: "Not found module",
    error_found: "Failed to recover module",
    success_remove:"Modules removed successfully",
    error_remove: "Failed to remove module",    
    success_updated: "Modules updated successfully",
    error_updated: "Failed to update module",
}

async function create(req, res, next) {
    try {
        const module_request = req.body;

        const new_module = await module_repository.create(module_request);
        
        if(!new_module){
            throw (new Error(messages.error_create, 422, true));
        }

        res.status(200).json({
            message:messages.success_create,
            module: new_module
        })
    }
    catch (exception) {
        throw (new Error(messages.error_create, 500, true, exception));
    }
}

async function list(req, res, next) {
    try {
        const module_list = await module_repository.list(req.query);
        
        if(!module_list || module_list.length < 1 ){
            throw (new Error(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            module_list
        });
    }
    catch (exception) {
        throw (new Error(messages.error_found, 500, true, exception));
    }
}

async function getById(req, res, next) {
    try {
        const module = await module_repository.getById(req.params.id);

        if(!module){
            throw (new Error(messages.not_found, 404, true));
        }

        res.status(200).json({
            message:messages.ok_found,
            module
        });
    }
    catch (exception) {
        throw (new Error(messages.error_found, 500, true, exception));
    }
}

async function update(req, res, next) {
    try {
        const module_request = req.body;

        const module = await module_repository.getById(req.params.id);

        if(!module){
            throw (new Error(messages.not_found, 404, true));
        }

        const updated_module = await module_repository.update(module, module_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_module
        });
    }
    catch (exception) {
        throw (new Error(messages.error_updated, 500, true, exception));
    }
}

async function remove(req, res, next) {
    try {
        const module = await module_repository.getById(req.params.id);

        if(!module){
            throw (new Error(messages.not_found, 404, true));
        }

        await module_repository.remove(module);

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