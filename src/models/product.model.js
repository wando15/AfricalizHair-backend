const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Product = db.define("product", {
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
    },
    brand_id: {
        type: DataTypes.INTEGER,
        references: { model: "brand", key: "id" }
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: { model: "category", key: "id" }
    }
}, {
    freezeTableName: true
});

Product.sync({ alter: true });


module.exports = Product;