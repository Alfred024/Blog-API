const express = require('express');
const app = express();
const config = require('../config/index');
const router = require('./network');

app.use(express.json());
app.use('/', router);

app.listen(config.postgresqlService.port, () =>{
    console.log(`PostgreSQL service listening at port ${config.postgresqlService.port}`);
});
