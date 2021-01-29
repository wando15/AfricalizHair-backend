const Profile_Module = require("../models/profile_module.model");

async function create(profile_module_request) {
    try {
        const new_profile_module = await Profile_Module.create(profile_module_request);

        return new_profile_module || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function list(query) {
    try {
        const list_profile_module = await Profile_Module.findAll({ where: query });

        return list_profile_module.length > 0 ? list_profile_module : undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getById(profile_id, module_id) {
    try {
        const profile_module = await Profile_Module.findOne({ where: { profile_id, module_id } });

        return profile_module || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function remove(profile_module) {
    try {
        await profile_module.destroy();
        return;
    }
    catch (exception) {
        throw exception;
    }
}

module.exports = {
    create,
    list,
    getById,
    remove
}

