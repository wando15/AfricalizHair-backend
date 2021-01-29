const Joi = require("joi");
const APIError = require("../../helpers/APIError");
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
            return next(new APIError("relation already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(new APIError("Failed to create relation", 500, true, exception));
    }
}

module.exports = {
    add,
    remove,
    recurrent
}