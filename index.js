const express = require("express");
const app = express();
// const http = require('http');
const session = require('express-session');
const routes = require("./routes/index.routes");
const { PORT, SESSION } = require("./config/server.config");
const { isEmptyObject } = require("./helpers/ObjectTools");
const APIError = require("./helpers/APIError");
const AppContainer = require("./src/Factories/UserFactory");

// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger_output.json');

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.json());

app.use(
    session(SESSION)
);

app.use((req, res, next) => {
    console.log('=====================METHOD======================');
    console.log(req.protocol + ' | ' + req.method + ' | ' + req.url);
    // console.log('=====================HEADERS=====================');
    // console.log(req.headers);

    if (!isEmptyObject(req.body)) {
        console.log('=====================BODY========================');
        console.log(req.body);
    }

    console.log('=================================================');
    console.log(new Date() + '');
    console.log('=================================================');
    next();
});

app.get("/status", (req, res) => {
    res.send("Servidor Online! :)");
});


/* const UserFactory = (req) => {
    const UserRepository = require('./src/repostiories/user.repository')
    const UserController = require('./src/controllers/user.controller')
    const DBConnection = require('./src/config/db/inMemoryConnection')

    const controller = new UserController({
        userRepository: new UserRepository(DBConnection)
    })

    const preparedPayload = { ...req.body, ...req.queryParams, ...req.headers}
    const result = controller.execute(preparedPayload)

    return result
} */


/* app.get('/get-user', (req, res, next) => {
    const result = UserFactory(req)

    res.result = result
    next()
},
    (req, res) => {
        if (res.result.error) {

        }
    },
    (req, res) => {
        res.status(200).send(res.result.data)
    }
) */

app.use("/", routes);

app.use(function (err, req, res, next) {
    if(!err instanceof APIError){
        return next(new APIError(err.message, 500, true, err));
    }
    next(err);
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status).json({
        code: err.status,
        message: err.message,
        stack: err.stack
    });
});

app.listen(PORT, () => {
    console.log(`run port: ${PORT}`);
});

// http.createServer(app).listen(PORT+1)
// console.log("Listening at:// port:%s (HTTP)", PORT+1)



/* 
Web -> request -> API

API

Rotas -> Factory -> Handler/Resolver = Controllers

Controller
 - dados da request
 - dependências que vão ajudar a processar a requisição
   - repositórios
   - services
     - mailer
   - models
   - formatters

- precisa receber as depedências que irá usar
  - construtor se for classe
  - argumentos se for função


interface BaseController {
    repository: BaseReposity

    contructor(dependencias, reqBody)

    execute(reqBody): { status: Number, data: Object, error: Error}
}

Factory
  - classe/função fábrica - retorna uma função ou classe especializada
    - prepara e fornece tudo que a classe/função precisa para funcionar adequadamente
 */
