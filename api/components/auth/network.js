const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler')
const { postAuthLogin } = require('../../schemas/auth.schema');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const secret = config.api.secret;

const router = express.Router();

router.post('/login', 
    validatorHandler(postAuthLogin, 'body'),
    passport.authenticate('local', {session: false}),
    async (req, res) =>{
        try {
            const user = req.user[0];
            const payload = {
                sub: user.id_user_blogger,
                role: user.role,
            }
            const token = jwt.sign(payload, secret, {expiresIn: '15m'});
            
            //Esta información debe guardarse en una cookie
            res.json({user, token});
        } catch (error) {
            res.send('ERROR catching the USER BY EMAIL')
        }
});


module.exports = router;