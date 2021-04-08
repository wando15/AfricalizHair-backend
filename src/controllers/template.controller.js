const template_repository = require("../repositories/template.repository");
const APIError = require("../../helpers/APIError");

const messages = {
    success_create: "Template created successfully",
    error_create: "Failed to create template",
    ok_found: "Template located successfully",
    ok_found_list: "Template list successfully retrieved",
    not_found: "Not found template",
    error_found: "Failed to recover template",
    success_remove: "Template removed successfully",
    error_remove: "Failed to remove template"
}

async function create(req, res, next) {
    try {
        const template_request = req.body;

        const new_template = await template_repository.create(template_request);

        if (!new_template) {
            throw (new APIError(messages.error_create, 422, true));
        }

        res.status(200).json({
            message: messages.success_create,
            template: new_template
        })
    }
    catch (exception) {
        return next(exception)
    }
}

async function list(req, res, next) {
    try {
        const list_templates = await template_repository.list(req.query);

        if (!list_templates || list_templates.length < 1) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found_list,
            list_templates
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function getById(req, res, next) {
    try {
        const template = await template_repository.getById(req.params.id);

        if (!template) {
            throw (new APIError(messages.not_found, 404, true));
        }

        res.status(200).json({
            message: messages.ok_found,
            template
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function remove(req, res, next) {
    try {
        const template = await template_repository.getById(req.params.id);

        if (!template) {
            throw (new APIError(messages.not_found, 404, true));
        }

        await template_repository.remove(template);

        res.status(200).json({
            message: messages.success_remove,
        });
    }
    catch (exception) {
        return next(exception)
    }
}

async function getTemplate(mail_options) {
    try {
        const template = await template_repository.getByTemplateId(mail_options.template_id);

        const html = replaceParams(mail_options.params, template.content);
        console.log(html);
        return {
            html: html,
            subject: template.subject
        };
    }
    catch (exception) {
        return next(exception)
    }
}

function replaceParams(params, template) {
    const objectArray = Object.entries(params);
    objectArray.forEach(([key, value]) => {
        template = template.replace(`[${key}]`, value);
    });

    return template;
}

module.exports = {
    create,
    list,
    getById,
    remove,
    getTemplate
}