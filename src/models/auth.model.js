const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Auth = db.define("auth", {
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time_in: {
        type: DataTypes.DATE
    },
    time_out: {
        type: DataTypes.DATE
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    
    }
}, {
    freezeTableName: true
});

module.exports = Auth;