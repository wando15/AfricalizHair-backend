
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

function UserController({ userRepository, bcrypt, config}) {
    async function load(req, res, next) {
        const user = await userRepository.getById(req.session.user.user_id);

        res.status(200).json({
            message: messages.ok_found,
            user,
            permission: user.modules
        });
    }

    const create = async (req, res, next) => {
        console.warn({ userRepository })
        try {
            const user_request = req.body;
            user_request.email = user_request.email.toLowerCase();
            user_request.pass = bcrypt.hashSync(user_request.pass, config.bcrypt.NUMBER_CRIPTY);

            return await this.userRepository.create(user_request);
        }
        catch (exception) {
            throw (new APIError(messages.error_create, 422, true));
        }
    }

    async function list(req, res, next) {
        try {
            const list_users = await userRepository.list(req.query);

            if (!list_users || list_users.length < 1) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found_list,
                list_users
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function getById(req, res, next) {
        try {
            const user = await userRepository.getById(req.params.id);

            if (!user) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found,
                user
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function update(req, res, next) {
        try {
            const user_request = req.body;

            const user = await userRepository.getById(req.params.id || req.session.user.user_id);

            if (!user) {
                throw (new APIError(messages.not_found, 404, true));
            }

            if (user_request.pass) {
                user_request.pass = bcrypt.hashSync(user_request.pass, config.bcrypt.NUMBER_CRIPTY);
            }

            const updated_user = await userRepository.update(user, user_request);

            res.status(200).json({
                message: messages.success_updated,
                user: updated_user
            });
        }
        catch (exception) {
            return next(exception)
        }
    }


    async function remove(req, res, next) {
        try {
            const user = await userRepository.getById(req.params.id);

            if (!user) {
                throw (new APIError(messages.not_found, 404, true));
            }

            await userRepository.remove(user);

            res.status(200).json({
                message: messages.success_remove,
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    return create
}

module.exports = UserController