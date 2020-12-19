const User = require("../models/user.model");

const messagesa = {
    create_success: "user created successfully",
    create_error: "failed to create user"
}

async function create(req, res){
    const user_request = req.body;

    var new_user = await User.create(user_request);

    if (new_user.Id == null){
        res.JSON({
            message: create_error,
            code: 422
        });
    }

    res.JSON({
        message: create_success,
        code: 200,
        user: new_user
    });
}

module.exports = {
    create
}