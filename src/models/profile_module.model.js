const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const ProfileModule = db.define("profile_module", {
    profile_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {model: "profile", key: "id"}
    },
    module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {model: "module", key: "id"}
    }
}, {
    freezeTableName: true
});

module.exports = ProfileModule;