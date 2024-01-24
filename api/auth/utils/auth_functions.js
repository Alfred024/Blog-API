const config = require('../../../config/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

class AuthFunctions{

    _secret = config.api.secret;

    createUserToken(userEmail) {
        const payload = {
            email: userEmail,
        }
        const token= jwt.sign(payload, this._secret, {expiresIn: '7d'});
        return token;
    }

    verifyToken(token) {
        const payload = jwt.verify(token, this._secret);
        return payload;
    }

    async encryptPassword(plainTextPassword) {
        return await bcrypt.hash(plainTextPassword, 7);
    }

    localAuthenticateUser(){
        return passport.authenticate('local', {session: false});   
    }

    // Dene obtener el user de alguna parte nuevamente
    async refreshUserToken(userEmail){
        return this.createUserToken(userEmail);
    }
}

module.exports = AuthFunctions;