const config = require('../../config/index');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api-key'];
    if(apiKey === config.api.api_key){
        next();
    }else{
        throw Error('Unauthorized API key.');
    }
}

module.exports = {checkApiKey};