const APIError = require("../../helpers/APIError");
const User = require("../models/user.model");

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
        const user = await User.findOne({ where: { id } });

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
        user.update(user_request);
        return user;
    }
    catch (exception) {
        throw exception;
    }
}

async function remove(user) {
    try {
        user.destroy();
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

