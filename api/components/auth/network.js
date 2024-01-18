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


router.post('/login', validatorHandler(postAuthLogin, 'body'), passport.authenticate('local', {session: false}), login);
router.post('/register', validatorHandler(createUserBloggerSchema, 'body'), register);
router.get('/confirmation/:emailToken', updateConifrmedStatus);

async function login(req, res, next) {
    try {
        const user = req.user[0];
        if (user.confirmed){
            const payload = {
                sub: user.id_user_blogger,
                role: user.role,
            }
            const token= jwt.sign(payload, secret,);
            res.json({user, token});
        }

        throw next(Error('Please, confirm your email before login.'));
    } catch (error) {
        next(error);
    }
}

async function register (req, res, next){
    let userData = req.body;
    userData.password = await bcrypt.hash(userData.password, 5);

    Controller.register(userData)
        .then(async (data) => {
            try {
                await getUserByEmail(userData.email);
            } catch (error) {
                next(Error('Error at trying to register the user'));
            }
            res.send('Great!! now, please check your email to confirm your account.');
        })
        .catch((err) =>{
            next(err);
        });
}

async function getUserByEmail(email){
    const data = {
        "table": "user_blogger",
        "param_name": "email",
        "param_value": email
    };
    Controller.get_user_blogger_by_email(data)
        .then( async (user) => {
            await sendEmailVerificationLink(user[0].id_user_blogger, user[0].email);
        })
        .catch((err) =>{
            next(Error('Error catching the user'));
        });
}

async function updateConifrmedStatus (req, res, next){
    try {
        const {sub} = jwt.verify(req.params.emailToken, config.api_smtp.password);

        Controller.update_user({confirmed: true}, sub)
            .then((data) =>{
                res.send('User confirmed. Now you can login.');
            })
            .catch((error) =>{
                next(error);
            });
    } catch (error) {
        next(boom.unauthorized('Expyred token.'));
    }
}

module.exports = router;