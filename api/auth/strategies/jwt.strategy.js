const config = require('../../../config/index');
const secret = config.api.secret;

const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}

var JWTStrategy = new Strategy(options, (payload, done)=>{
    return done(null, payload);
});

module.exports = JWTStrategy;