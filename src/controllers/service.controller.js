const messages = {
    success_create: "Modules created successfully",
    error_create: "Failed to create service",
    ok_found: "Modules located successfully",
    ok_found_list: "Modules list successfully retrieved",
    not_found: "Not found service",
    error_found: "Failed to recover service",
    success_remove: "Modules removed successfully",
    error_remove: "Failed to remove service",
    success_updated: "Modules updated successfully",
    error_updated: "Failed to update service",
}

function ServiceController(ServiceRepository, APIError) {
    async function create(req, res, next) {
        try {
            const service_request = req.body;

            const new_service = await ServiceRepository.create(service_request);

            if (!new_service) {
                throw (new APIError(messages.error_create, 422, true));
            }

            res.status(200).json({
                message: messages.success_create,
                service: new_service
            })
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function list(req, res, next) {
        try {
            const service_list = await ServiceRepository.list(req.query);

            if (!service_list || service_list.length < 1) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found_list,
                service_list
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function getById(req, res, next) {
        try {
            const service = await ServiceRepository.getById(req.params.id);

            if (!service) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found,
                service
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function update(req, res, next) {
        try {
            const service_request = req.body;

            const service = await ServiceRepository.getById(req.params.id);

            if (!service) {
                throw (new APIError(messages.not_found, 404, true));
            }

            const updated_service = await ServiceRepository.update(service, service_request);

            res.status(200).json({
                message: messages.success_updated,
                user: updated_service
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function remove(req, res, next) {
        try {
            const service = await ServiceRepository.getById(req.params.id);

            if (!service) {
                throw (new APIError(messages.not_found, 404, true));
            }

            await ServiceRepository.remove(service);

            res.status(200).json({
                message: messages.success_remove,
            });
        }
        catch (exception) {
            return next(exception)
        }
    }
}

module.exports = ServiceController