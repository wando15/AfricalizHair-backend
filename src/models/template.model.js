const { DataTypes } = require("sequelize");
const db = require("../../database/db-connect");

const Template = db.define("template", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    template_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.BLOB('long'),
    }
}, {
    freezeTableName: true
});

module.exports = Template;