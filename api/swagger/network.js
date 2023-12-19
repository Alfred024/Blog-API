const express = require('express');
const router = express.Router();

//Swagger modules
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;