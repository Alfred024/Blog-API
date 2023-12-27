const config = require('../../config/index');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api-key'];
    if(apiKey === config.api.api_key){
        next();
    }else{
        throw Error('Unauthorized API key.');
    }
}

function checkRoles(...roles) {
    return (req, res, next) =>{
        const user = req.user;
        if(roles.includes(user.role)){
            next();
        }else{
            throw Error(`Only roles:${roles} can do this action`)
        }
    }
}

module.exports = {checkApiKey, checkRoles};