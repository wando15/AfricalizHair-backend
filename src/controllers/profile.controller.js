const profile_repository = require("../repositories/profile.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Profile created successfully",
    error_create: "Failed to create profile",
    ok_found: "Profile located successfully",
    ok_found_list: "Profile list successfully retrieved",
    not_found: "Not found profile",
    error_found: "Failed to recover profile",
    success_remove: "Profile removed successfully",
    error_remove: "Failed to remove profile",
    success_updated: "Profile updated successfully",
    error_updated: "Failed to update profile",
}

async function create(req, res, next) {
    try {
        const profile_request = req.body;

        const new_profile = await profile_repository.create(profile_request);

        if (!new_profile) {
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message: messages.success_create,
            profile: new_profile
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function list(req, res, next) {
    try {
        const profile_list = await profile_repository.list(req.query);

        if (!profile_list || profile_list.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            profile_list
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function getById(req, res, next) {
    try {
        let profile = await profile_repository.getById(req.params.id);

        if (!profile) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found,
            profile,
            modules: profile.modules
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function update(req, res, next) {
    try {
        const profile_request = req.body;

        const profile = await profile_repository.getById(req.params.id);

        if (!profile) {
            throw (new APIError(messages.not_found, 404, true));
        }

        const updated_profile = await profile_repository.update(profile, profile_request);

        res.status(200).json({
            message: messages.success_updated,
            user: updated_profile
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function remove(req, res, next) {
    try {
        const profile = await profile_repository.getById(req.params.id);

        if (!profile) {
            throw (new APIError(messages.not_found, 404, true));
        }

        await profile_repository.remove(profile);

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