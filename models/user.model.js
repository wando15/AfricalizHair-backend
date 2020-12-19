const { DataTypes } = require('sequelize');
const db = require('../config/db-connect');

const User = db.define('User', {
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
}, {});

module.exports = User;