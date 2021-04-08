const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Order = db.define("order", {
    value: {
        type: DataTypes.DECIMAL(17,2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(5,3)
    },
    payment_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Customer;