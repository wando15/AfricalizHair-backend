const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const ProfileModule = db.define("profile_module", {
    profile_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    freezeTableName: true
});

module.exports = ProfileModule;