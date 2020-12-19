const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
const { PORT } = require('./config/server-config');

app.get('/status', (req, res) => {
    res.send('Servidor Online! :)');
});

app.use('', (req, res, next) => {
    console.log(JSON.stringify(req.body))
    next();
});

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`port: ${PORT}`);
});