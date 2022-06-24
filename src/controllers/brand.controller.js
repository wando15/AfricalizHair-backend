const messages = {
    success_create: "Brand created successfully",
    error_create: 'Failed to create brand',
    ok_found: "Brand located successfully",
    ok_found_list: "Brand list successfully retrieved",
    not_found: "Not found brand",
    error_found: "Failed to recover brand",
    success_remove: "Brand removed successfully",
    error_remove: "Failed to remove brand",
    success_updated: "Brand updated successfully",
    error_updated: "Failed to update brand",
}

function BrandController(BrandRepository, APIError) {
    async function create(req, res, next) {
        try {
            const brand_request = req.body;

            const new_brand = await BrandRepository.create(brand_request);

            if (!new_brand) {
                throw (new APIError(messages.error_create, 422, true));
            }

            res.status(200).json({
                message: messages.success_create,
                brand: new_brand
            })
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function list(req, res, next) {
        try {
            const list_brands = await BrandRepository.list(req.query);

            if (!list_brands || list_brands.length < 1) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found_list,
                list_brands
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function getById(req, res, next) {
        try {
            const brand = await BrandRepository.getById(req.params.id);

            if (!brand) {
                return next(exception)
            }

            res.status(200).json({
                message: messages.ok_found,
                brand
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function update(req, res, next) {
        try {
            const brand_request = req.body;

            const brand = await BrandRepository.getById(req.params.id);

            if (!brand) {
                throw (new APIError(messages.not_found, 404, true));
            }

            const updated_brand = await BrandRepository.update(brand, brand_request);

            res.status(200).json({
                message: messages.success_updated,
                user: updated_brand
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function remove(req, res, next) {
        try {
            const brand = await BrandRepository.getById(req.params.id);

            if (!brand) {
                throw (new APIError(messages.not_found, 404, true));
            }

            await BrandRepository.remove(brand);

            res.status(200).json({
                message: messages.success_remove,
            });
        }
        catch (exception) {
            return next(exception)
        }
    }
}

module.exports = BrandController