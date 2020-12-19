const { Sequelize } = require('sequelize');
const config = require('./server-config');

const { database, username, password, host, dialect } = config.DBCONECT.DEV;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true
    }
});

module.exports = sequelize;