const express = require('express');
const app = express();
const config = require('../config/index');
const router = require('./network');
// Validation middleware
const { checkApiKey } = require('./middlewares/auth.handler');
// Error handler middlewares
const { printErrors, errorHandler } = require('./middlewares/error.handler');

app.use(express.json());
app.use('/', router);
//app.use('/', checkApiKey, router);

app.use(printErrors);
app.use(errorHandler);

app.listen(config.postgresql_service.port, () =>{
    console.log(`PostgreSQL service listening at port ${config.postgresql_service.port}`);
});
