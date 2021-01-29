const Module = require("../models/module.model");
const Profile_Module = require("../models/profile_module.model");

async function create(module_request) {
    try {
        const new_module = await Module.create(module_request);

        return new_module || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function list(query) {
    try {
        const list_module = await Module.findAll({ where: query });

        return list_module.length > 0 ? list_module : undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getById(id) {
    try {
        const module = await Module.findOne({ where: { id } });

        return module || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function update(module, module_request) {
    try {
        await module.update(module_request);
        return module;
    }
    catch (exception) {
        throw exception;
    }
}


async function remove(module) {
    try {
        const profile_module_list = await Profile_Module.findAll({ where: { module_id: module.id } });

        if (profile_module_list) {
            for (let pm of profile_module_list) {
                await pm.destroy();
            };
        }

        await module.destroy();
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
    remove,
    update
}

