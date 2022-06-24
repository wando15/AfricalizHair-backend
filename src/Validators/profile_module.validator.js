const Joi = require("joi");
const profile_module_repository = require("../repositories/profile_module.repository");
const APIError = require("../../helpers/APIError");


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
            throw (new APIError("relation already exist", 422, true));
        }

        next();
    }
    catch (exception) {
        return next(exception)
    }
}

module.exports = {
    add,
    remove,
    recurrent
}