const Service = require("../models/service.model");

async function create(service_request) {
    try {
        const new_service = await Service.create(service_request);

        return new_service || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function list(query) {
    try {
        const list_service = await Service.findAll({ where: query });

        return list_service.length > 0 ? list_service : undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getById(id) {
    try {
        const service = await Service.findOne({ where: { id } });

        return service || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function update(service, service_request) {
    try {
        await service.update(service_request);
        return service;
    }
    catch (exception) {
        throw exception;
    }
}

async function remove(service) {
    try {
        await service.destroy();
        return;
    }
    catch (exception) {
        throw exception;
    }
}

module.exports = {
    create,
    list,
    getById,
    remove,
    update
}

