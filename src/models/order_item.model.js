const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const OrderItem = db.define("order_item", {
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

module.exports = OrderItem;