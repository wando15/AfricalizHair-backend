const messages = {
    success_create: "Services created successfully",
    error_create: "Failed to create module",
    ok_found: "Services located successfully",
    ok_found_list: "Services list successfully retrieved",
    not_found: "Not found module",
    error_found: "Failed to recover module",
    success_remove: "Services removed successfully",
    error_remove: "Failed to remove module",
    success_updated: "Services updated successfully",
    error_updated: "Failed to update module",
}

function ModuleController(ModuleRepository, APIError) {
    async function create(req, res, next) {
        try {
            const module_request = req.body;

            const new_module = await ModuleRepository.create(module_request);

            if (!new_module) {
                throw (new APIError(messages.error_create, 422, true));
            }

            res.status(200).json({
                message: messages.success_create,
                module: new_module
            })
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function list(req, res, next) {
        try {
            const module_list = await ModuleRepository.list(req.query);

            if (!module_list || module_list.length < 1) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found_list,
                module_list
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function getById(req, res, next) {
        try {
            const module = await ModuleRepository.getById(req.params.id);

            if (!module) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found,
                module
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function update(req, res, next) {
        try {
            const module_request = req.body;

            const module = await ModuleRepository.getById(req.params.id);

            if (!module) {
                throw (new APIError(messages.not_found, 404, true));
            }

            const updated_module = await ModuleRepository.update(module, module_request);

            res.status(200).json({
                message: messages.success_updated,
                user: updated_module
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function remove(req, res, next) {
        try {
            const module = await ModuleRepository.getById(req.params.id);

            if (!module) {
                throw (new APIError(messages.not_found, 404, true));
            }

            await ModuleRepository.remove(module);

            res.status(200).json({
                message: messages.success_remove,
            });
        }
        catch (exception) {
            return next(exception)
        }
    }
}

module.exports = ModuleController