function ProductRepository(Product) {
    async function create(product_request) {
        try {
            const new_product = await Product.create(product_request);

            return new_product || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_product = await Product.findAll({ where: query });

            return list_product.length > 0 ? list_product : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            const product = await Product.findOne({ where: { id } });

            return product || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(product, product_request) {
        try {
            await product.update(product_request);
            return product;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(product) {
        try {
            await product.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    ProductRepository
}

