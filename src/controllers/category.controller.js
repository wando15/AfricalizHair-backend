const messages = {
    success_create: "Category created successfully",
    error_create: "Failed to create category",
    ok_found: "Category located successfully",
    ok_found_list: "Category list successfully retrieved",
    not_found: "Not found category",
    error_found: "Failed to recover category",
    success_remove: "Category removed successfully",
    error_remove: "Failed to remove category",
    success_updated: "Category updated successfully",
    error_updated: "Failed to update category",
}

function CategoryController(CategoryRepository) {
    async function create(req, res, next) {
        try {
            const category_request = req.body;

            const new_category = await CategoryRepository.create(category_request);

            if (!new_category) {
                throw (new APIError(messages.error_create, 422, true));
            }

            res.status(200).json({
                message: messages.success_create,
                category: new_category
            })
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function list(req, res, next) {
        try {
            const list_categorys = await CategoryRepository.list(req.query);

            if (!list_categorys || list_categorys.length < 1) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found_list,
                list_categorys
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function getById(req, res, next) {
        try {
            const category = await CategoryRepository.getById(req.params.id);

            if (!category) {
                throw (new APIError(messages.not_found, 404, true));
            }

            res.status(200).json({
                message: messages.ok_found,
                category
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function update(req, res, next) {
        try {
            const category_request = req.body;

            const category = await CategoryRepository.getById(req.params.id);

            if (!category) {
                throw (new APIError(messages.not_found, 404, true));
            }

            const updated_category = await CategoryRepository.update(category, category_request);

            res.status(200).json({
                message: messages.success_updated,
                user: updated_category
            });
        }
        catch (exception) {
            return next(exception)
        }
    }

    async function remove(req, res, next) {
        try {
            const category = await CategoryRepository.getById(req.params.id);

            if (!category) {
                throw (new APIError(messages.not_found, 404, true));
            }

            await CategoryRepository.remove(category);

            res.status(200).json({
                message: messages.success_remove,
            });
        }
        catch (exception) {
            return next(exception)
        }
    }
}
module.exports = CategoryController