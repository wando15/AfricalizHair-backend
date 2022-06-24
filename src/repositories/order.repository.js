function OrderRepository(Order) {
    async function create(order_request) {
        try {
            const new_order = await Order.create(order_request);

            return new_order || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_order = await Order.findAll({ where: query });

            return list_order.length > 0 ? list_order : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            const order = await Order.findOne({ where: { id } });

            return order || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(order, order_request) {
        try {
            await order.update(order_request);
            return order;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(order) {
        try {
            await order.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    OrderRepository
}

