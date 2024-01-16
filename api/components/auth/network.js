const express = require('express');
const router = express.Router();
const Controller = require('./index');
// JWT Secret
const config = require('../../../config/index');
//Auth 
const secret = config.api.secret;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Middlewares
const {validatorHandler} = require('../../middlewares/validator.handler')
//JOi schemas
const { postAuthLogin } = require('../../schemas/auth.schema');
const { createUserBloggerSchema } = require('../../schemas/user_blogger.schema');
//Errors
const boom = require('@hapi/boom');


router.post('/login', 
    validatorHandler(postAuthLogin, 'body'),
    passport.authenticate('local', {session: false}),
    async (req, res, next) =>{
        try {
            let userConfirmedStatus = checkUserConfirmStatus();

            const user = req.user[0];
            const payload = {
                sub: user.id_user_blogger,
                role: user.role,
                confirmed: userConfirmedStatus,
            }

            const token = jwt.sign(payload, secret,);
            //const token = jwt.sign(payload, secret, {expiresIn: '15m'});
            
            res.json({user, token});
        } catch (error) {
            next(err);
        }
});

router.post('/register', 
    validatorHandler(createUserBloggerSchema, 'body'),
    async (req, res, next) => {
        let data = req.body;
        data.password = await bcrypt.hash(data.password, 5);
        Controller.register(data)
            .then((data) =>{
                console.log(`DB message: ${data}`);
                res.send('User registered succesfully!!');
            })
            .catch((err) =>{
                next(err);
            });
});

router.post('send-email', (req, res, next) =>{

});

module.exports = router;