const { DataTypes } = require('sequelize');
const db = require('../config/db-connect');

const Auth_user = db.define('Auth_user', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiration_token: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {});

module.exports = Auth_user;