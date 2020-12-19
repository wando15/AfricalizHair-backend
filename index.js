const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
const { PORT } = require('./config/server-config');

app.get('/status', (req, res) => {
    res.send('Servidor Online! :)');
});

app.use((req, res, next) => {
    req.locals = [];
    next();
});

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`run port: ${PORT}`);
});