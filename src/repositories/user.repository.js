const User = require("../models/user.model");
const module_repository = require("./module.repository");
const profile_module_repository = require("./profile_module.repository");

const messages = {
    error_create: "Failed to create user"
}

async function create(user_request) {
    try {
        const new_user = await User.create(user_request);

        return new_user || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function list(query) {
    try {
        const list_user = await User.findAll({ where: query });

        return list_user.length > 0 ? list_user : undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getById(id) {
    try {
        let user = await User.findOne({ where: { id } });


        if (user && user.profile_id) {
            user.module = await profile_module_repository.list({ profile_id: user.profile_id });
            const modules = [];
            for (let module of user.module) {
                module = await module_repository.getById(module.module_id);
                modules.push(module);
            }
            user.modules = modules;
        }

        return user || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getByEmail(email) {
    try {
        const user = await User.findOne({ where: { email } });

        return user || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getByRessetKey(pass_resset_key) {
    try {
        const user = await User.findOne({ where: { pass_resset_key } });

        return user || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function update(user, user_request) {
    try {
        await user.update(user_request);
        return user || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function remove(user) {
    try {
        await user.destroy();
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
    getByEmail,
    remove,
    update,
    getByRessetKey
}

