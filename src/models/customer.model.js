const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Customer = db.define("customer", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Customer.sync({ alter: true });

module.exports = Customer;