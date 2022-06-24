function OrderItemRepository(Order_item) {
    async function create(order_item_request) {
        try {
            const new_order_item = await Order_item.create(order_item_request);

            return new_order_item || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function list(query) {
        try {
            const list_order_item = await Order_item.findAll({ where: query });

            return list_order_item.length > 0 ? list_order_item : undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function getById(id) {
        try {
            const order_item = await Order_item.findOne({ where: { id } });

            return order_item || undefined;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function update(order_item, order_item_request) {
        try {
            await order_item.update(order_item_request);
            return order_item;
        }
        catch (exception) {
            throw exception;
        }
    }

    async function remove(order_item) {
        try {
            await order_item.destroy();
            return;
        }
        catch (exception) {
            throw exception;
        }
    }
}

module.exports = {
    OrderItemRepository
}

