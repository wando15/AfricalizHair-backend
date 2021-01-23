const Auth = require("../models/auth.model");

async function create(auth_request) {
    const new_auth = await Auth.create(auth_request);

    return new_auth || undefined;
}

async function list(query) {
    const list_auth = await Auth.findAll({ where: query });

    return list_auth.length > 0 ? list_auth : undefined;
}

async function update(auth, auth_request) {
    auth.update(auth_request);
    return auth;
}

async function getById(id) {
    const auth = await Auth.findOne({ where: { id } });

    return auth || undefined;
}

module.exports = {
    create,
    list,
    getById,
    update
}

