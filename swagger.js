const swaggerAutogen = require('swagger-autogen')();
const routes = require('./routes/index.routes');
const outputFile = './swagger_output.json';

swaggerAutogen(outputFile, routes);