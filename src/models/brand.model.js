const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Brand = db.define("brand", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Brand.sync({ alter: true });


module.exports = Brand;