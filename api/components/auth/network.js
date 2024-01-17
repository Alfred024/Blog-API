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
const {validatorHandler} = require('../../middlewares/validator.handler');
//JOi schemas
const { postAuthLogin } = require('../../schemas/auth.schema');
const { createUserBloggerSchema } = require('../../schemas/user_blogger.schema');
//Errors
const boom = require('@hapi/boom');
// SMTP functions
const {sendEmailVerificationLink} = require('./utils/email_functions');


router.post('/login', 
    validatorHandler(postAuthLogin, 'body'),
    passport.authenticate('local', {session: false}),
    async (req, res, next) =>{
        try {
            // const user = req.user[0];
            // const payload = {
            //     sub: user.id_user_blogger,
            //     role: user.role,
            // }

            // const token= jwt.sign(payload, secret,);
            // res.json({user, token});
            const user = req.user[0];
            if (user.confirmed){
                const payload = {
                    sub: user.id_user_blogger,
                    role: user.role,
                    //confirmed: userConfirmedStatus,
                }
    
                const token= jwt.sign(payload, secret,);
                res.json({user, token});
            }

            throw next(Error('Please, confirm your email before login.'));
        } catch (error) {
            next(error);
        }
});

router.post('/register', 
    validatorHandler(createUserBloggerSchema, 'body'),
    async (req, res, next) => {
        // Mandar el código de verificación
        let userData = req.body;
        userData.password = await bcrypt.hash(userData.password, 5);
        console.log('Sending email...');
        await sendEmailVerificationLink(userData.id_user_blogger, userData.email);
        Controller.register(userData)
            .then(async (data) => {
                console.log(`DB message: ${data}`);
                res.send('Great!! now, please check your email to confirm your account.');
            })
            .catch((err) =>{
                next(err);
            });
});

router.get('/confirmation/:emailToken', (req, res, next) =>{
    try {
        const { id_user_blogger } = jwt.verify(req.params.emailToken, config.api_smtp.password);
        // SE ACTUALIZA EL USER BLOGGER CON ESE ID: CONFIRMED = TRUE;
        res.redirect('/login');
    } catch (error) {
        next(boom.unauthorized('Please, check your email and click the confirmation link.'))
    }
});

module.exports = router;