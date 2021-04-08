const Template = require("../models/template.model");
const Buffer = require('Buffer');
const base64url = require('base64-url')

async function create(template_request) {
    try {
        const new_template = await Template.create(template_request);

        return new_template || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function list(query) {
    try {
        const list_template = await Template.findAll({ where: query });

        return list_template.length > 0 ? list_template : undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getById(id) {
    try {
        let template = await Template.findOne({ where: { id } });

        if (template) {
            template.content = base64url.decode(template.content);
        }

        return template || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function getByTemplateId(template_id) {
    try {
        let template = await Template.findOne({ where: { template_id } });

        if (template) {
            template.content = base64url.decode(template.content);
        }

        return template || undefined;
    }
    catch (exception) {
        throw exception;
    }
}

async function remove(template) {
    try {
        await template.destroy();
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
    getByTemplateId
}

