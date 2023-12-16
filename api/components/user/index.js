const store = require('../../../store/remote-postgresql');
const ctrl = require('./controller');

module.exports = ctrl(store);
//module.exports = ctrl([]);