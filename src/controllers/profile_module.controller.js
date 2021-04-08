const profile_module_repository = require("../repositories/profile_module.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Relation created successfully",
    error_create: "Failed to create relation",
    not_found: "Not found Relation",
    success_remove:"Relation removed successfully",
    error_remove: "Failed to remove relation"
}

async function add(req, res, next) {
    try {
        const profile_module_request = req.body;

        const new_profile_module = await profile_module_repository.create(profile_module_request);
        
        if(!new_profile_module){
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message:messages.success_create
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function remove(req, res, next) {
    try {
        const profile_module = await profile_module_repository.getById(req.body);

        if(!profile_module){
            throw (new APIError(messages.not_found, 404, true));
        }

        await profile_module_repository.remove(profile_module);

        res.status(200).json({
            message: messages.success_remove,
        });
    }
    catch (exception) {
        return next(exception)
    }
}

module.exports = {
    add,
    remove
}