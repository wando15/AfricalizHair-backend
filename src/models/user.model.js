const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const User = db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass_resset_key: {
        type: DataTypes.STRING
    },
    pass_key_expires: {
        type: DataTypes.BIGINT
    }
}, {
    freezeTableName: true
});

User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.pass;
    delete values.pass_resset_key;
    delete values.pass_key_expires;
    return values;
}


module.exports = User;