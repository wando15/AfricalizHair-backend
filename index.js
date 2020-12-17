const express = require('express');
const app = express();
const routes = require('./routes/index.routes');

app.get('/status',(req, res) =>{
    res.send('Servidor Online! :)');
});

app.use('', routes);

app.listen(8080, () => {});