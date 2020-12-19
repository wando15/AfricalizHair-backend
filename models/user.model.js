const { DataTypes } = require('sequelize');
const db = require('../config/db-connect');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass_hash: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = User;