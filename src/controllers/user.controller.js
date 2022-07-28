
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "User created successfully",
    error_create: "Failed to create user",
    ok_found: "User located successfully",
    ok_found_list: "User list successfully retrieved",
    not_found: "Not found user",
    error_found: "Failed to recover user",
    success_remove: "User removed successfully",
    error_remove: "Failed to remove user",
    success_updated: "User updated successfully",
    error_updated: "Failed to update user",
}

function UserController({ userRepository, bcrypt, config }) {

    async function create(req, res, next) {
        const user_request = req.body;
        user_request.email = user_request.email.toLowerCase();
        user_request.pass = bcrypt.hashSync(user_request.pass, config.bcrypt.NUMBER_CRIPTY);

        return await userRepository.create(user_request);
    }

    async function list(req, res, next) {
        const list_users = await userRepository.list(req.query);

        if (!list_users || list_users.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        return list_users;
    }

    async function getById(req, res, next) {
        const user = await userRepository.getById(req.params.id);

        if (!user) {
            throw (new APIError(messages.not_found, 404, true));
        }

        return user;
    }

    async function update(req, res, next) {
            const user_request = req.body;

            const user = await userRepository.getById(req.params.id || req.session.user.user_id);

            if (!user) {
                throw (new APIError(messages.not_found, 404, true));
            }

            user_request.pass = user.pass;

            return await userRepository.update(user, user_request);
    }


    async function remove(req, res, next) {
            const user = await userRepository.getById(req.params.id);

            if (!user) {
                throw (new APIError(messages.not_found, 404, true));
            }

            await userRepository.remove(user);
    }

    return {
        create,
        list,
        getById,
        update,
        remove
    }
}

module.exports = UserController