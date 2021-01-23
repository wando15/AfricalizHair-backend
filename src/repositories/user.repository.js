const User = require("../models/user.model");

async function create(user_request) {
    const new_user = await User.create(user_request);

    return new_user || undefined;
}

async function list(query) {
    const list_user = await User.findAll({ where: query });

    return list_user.length > 0 ? list_user : undefined;
}

async function getById(id) {
    const user = await User.findOne({ where: { id } });

    return user || undefined;
}

async function update(user, user_request) {
    user.update(user_request);
    return user;
}

async function remove(user) {
    user.destroy();
    return;
}

module.exports = {
    create,
    list,
    getById,
    remove,
    update
}

