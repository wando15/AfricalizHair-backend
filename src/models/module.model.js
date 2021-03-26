const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Module = db.define("module", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Module;