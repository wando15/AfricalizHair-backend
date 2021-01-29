const Auth = require("../models/auth.model");

async function create(auth_request) {
    try {
        const new_auth = await Auth.create(auth_request);

        return new_auth || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function list(query) {
    try {
        const list_auth = await Auth.findAll({ where: query });

        return list_auth.length > 0 ? list_auth : undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function update(auth, auth_request) {
    try {
        await auth.update(auth_request);
        return auth || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getById(id) {
    try {
        const auth = await Auth.findOne({ where: { id } });

        return auth || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

module.exports = {
    create,
    list,
    getById,
    update
}

