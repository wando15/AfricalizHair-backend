const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Category = db.define("category", {
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

Category.sync({ alter: true });


module.exports = Category;