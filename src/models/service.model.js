const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Service = db.define("service", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    is_real_profit: {
        type: DataTypes.BOOLEAN
    },
    price: {
        type: DataTypes.DECIMAL(18,2),
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Service;