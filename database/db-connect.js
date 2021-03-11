const Sequelize = require("sequelize");
const config = require("../config/db-config");

const connection = new Sequelize(config);

connection.authenticate()
  .then(() => {
    console.log(`Connection ${config.database} has been established successfully.`);
  })
  .catch((exception) => {
    console.log(`Unable to connect to the database ${config.database}:`, exception.parent);
  });


module.exports = connection;