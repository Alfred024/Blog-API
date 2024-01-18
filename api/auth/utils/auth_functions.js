const config = require('../../../config/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

class AuthFunctions{

    _secret = config.api.secret;

    createUserToken(user) {
        const payload = {
            sub: user.id_user_blogger,
            role: user.role,
        }
        const token= jwt.sign(payload, this._secret,);
        return token;
    }

    verifyToken(token) {
        const {sub} = jwt.verify(token, this._secret);
        return sub;
    }

    async encryptPassword(plainTextPassword) {
        return await bcrypt.hash(plainTextPassword, 7);
    }

    localAuthenticateUser(){
        return passport.authenticate('local', {session: false});   
    }

    async jwtAuthenticateUser(){
        
    }
}

module.exports = AuthFunctions;