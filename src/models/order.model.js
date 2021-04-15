const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Order = db.define("order", {
    value: {
        type: DataTypes.DECIMAL(17,2),
        allowNull: false
    },
    amount_itens: {
        type: DataTypes.DECIMAL(5,3)
    },
    payment_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Order;