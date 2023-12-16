const remoteDBService = require('./remote');
const config = require('../config');

module.exports = new remoteDBService(config.postgresql_service.host, config.postgresql_service.port);