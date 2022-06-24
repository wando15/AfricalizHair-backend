
function ProfileRepository(Profile, ModuleRepository, profileModuleRepository) {
    async function create(profile_request) {
        try {
            const new_profile = await Profile.create(profile_request);

            return new_profile || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_profile = await Profile.findAll({ where: query });

            return list_profile.length > 0 ? list_profile : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            let profile = await Profile.findOne({ where: { id } });

            if (profile) {
                profile.modules = await profileModuleRepository.list({ profile_id: profile.id });
                const modules = [];
                for (let module of profile.modules) {
                    module = await ModuleRepository.getById(module.module_id);
                    modules.push(module);
                }
                profile.modules = modules;
            }

            return profile || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(profile, profile_request) {
        try {
            await profile.update(profile_request);
            return profile;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(profile) {
        try {
            const profile_module_list = await profileModuleRepository.findAll({ where: { profile_id: profile.id } });

            if (profile_module_list) {
                for (let pm of profile_module_list) {
                    await pm.destroy();
                };
            }

            await profile.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    ProfileRepository
}

