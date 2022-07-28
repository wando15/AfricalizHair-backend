function UserRepository(User, ModuleRepository, ProfileModuleRepository) {
    async function create(user_request) {
        try {
            return await User.findOrCreate({
                where: { email: user_request.email },
                defaults: user_request
            });
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
                user.module = await ProfileModuleRepository.list({ profile_id: user.profile_id });
                const modules = [];
                for (let module of user.module) {
                    module = await ModuleRepository.getById(module.module_id);
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

    return {
        create,
        list,
        getByEmail,
        getByRessetKey,
        getById,
        update,
        remove
    }
}

module.exports = UserRepository;

