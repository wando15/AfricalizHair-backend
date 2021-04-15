const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const ProfileModule = db.define("profile_module", {
    value: {
        type: DataTypes.DECIMAL(12, 2),
        allownull: false
    },
    amount: {
        type: DataTypes.DECIMAL(12, 3),
        allownull: false
    },
    value_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allownull: false
    }
}, {
    freezeTableName: true
});

module.exports = ProfileModule;