function CustomerRepository(Customer) {
    async function create(customer_request) {
        try {
            const new_customer = await Customer.create(customer_request);

            return new_customer || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_customer = await Customer.findAll({ where: query });

            return list_customer.length > 0 ? list_customer : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            const customer = await Customer.findOne({ where: { id } });

            return customer || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(customer, customer_request) {
        try {
            await customer.update(customer_request);
            return customer;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(customer) {
        try {
            await customer.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    CustomerRepository
}

