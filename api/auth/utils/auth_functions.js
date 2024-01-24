const config = require('../../../config/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

class AuthFunctions{

    _secret = config.api.secret;

    createUserToken(userEmail, id_user, role) {
        const payload = {
            sub: id_user,
            email: userEmail,
            role: role,
        }
        //const token= jwt.sign(payload, this._secret, {expiresIn: '7d'});
        const token= jwt.sign(payload, this._secret, {expiresIn: '240s'});
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

    jwtAuthenticateUser(){
        try {
            console.log('Sí autentiqué');
            return passport.authenticate('jwt', {session:false});  
        } catch (error) {
            console.log('Authenticate JWT error');
            console.log(error);
        }
    }

    refreshUserToken(userEmail){
        return this.createUserToken(userEmail);
    }
}

module.exports = AuthFunctions;