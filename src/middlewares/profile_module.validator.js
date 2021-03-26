const Joi = require("joi");
const profile_module_repository = require("../repositories/profile_module.repository");


const body = {
    profile_id: Joi.number().required(),
    module_id: Joi.number().required()
};

const add = {
    body
}

const remove = {
    body
};

async function recurrent(req, res, next) {
    try {
        const request = req.body;
        const already = await profile_module_repository.list( request );

        if (already) {
            throw (new Error("relation already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        throw (new Error("Failed to create relation", 500, true, exception));
    }
}

module.exports = {
    add,
    remove,
    recurrent
}