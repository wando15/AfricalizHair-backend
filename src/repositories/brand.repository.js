function BrandRepository(Brand) {
    async function create(brand_request) {
        try {
            const new_brand = await Brand.create(brand_request);

            return new_brand || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_brand = await Brand.findAll({ where: query });

            return list_brand.length > 0 ? list_brand : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            const brand = await Brand.findOne({ where: { id } });

            return brand || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(brand, brand_request) {
        try {
            await brand.update(brand_request);
            return brand;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(brand) {
        try {
            await brand.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    BrandRepository
}

