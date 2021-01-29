const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Profile = db.define("profile", {
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

Profile.sync({ alter: true });

module.exports = Profile;