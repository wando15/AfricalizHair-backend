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
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass_hash: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

User.sync();

module.exports = User;