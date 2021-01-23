const Customer = require("../models/customer.model");

async function create(customer_request) {
    const new_customer = await Customer.create(customer_request);

    return new_customer || undefined;
}

async function list(query) {
    const list_customer = await Customer.findAll({ where: query });

    return list_customer.length > 0 ? list_customer : undefined;
}

async function getById(id) {
    const customer = await Customer.findOne({ where: { id } });

    return customer || undefined;
}

async function update(customer, customer_request) {
    customer.update(customer_request);
    return customer;
}

async function remove(customer) {
    customer.destroy();
    return;
}

module.exports = {
    create,
    list,
    getById,
    remove,
    update
}

