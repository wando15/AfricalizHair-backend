const { Sequelize } = require('sequelize');
const config = require('./server-config');

const db = config.DBCONECT.DEV;

const sequelize = new Sequelize(db);
   
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection ${db.database} has been established successfully.`);
  })
  .catch((err) => {
    console.log(`Unable to connect to the database ${db.database}:`, err.parent);
  });

module.exports = sequelize;