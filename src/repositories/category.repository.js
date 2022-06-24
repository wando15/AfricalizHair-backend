function CategoryRepository(Category) {
    async function create(category_request) {
        try {
            const new_category = await Category.create(category_request);

            return new_category || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_category = await Category.findAll({ where: query });

            return list_category.length > 0 ? list_category : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            const category = await Category.findOne({ where: { id } });

            return category || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(category, category_request) {
        try {
            await category.update(category_request);
            return category;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(category) {
        try {
            await category.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    CategoryRepository
}

