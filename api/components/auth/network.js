const express = require('express');
const router = express.Router();
const Controller = require('./index');
//Middlewares
const { validatorHandler } = require('../../middlewares/validator.handler');
//JOI schemas
const { postAuthLogin, postAuthRegisterSchema } = require('../../schemas/auth.schema');
//Errors
const boom = require('@hapi/boom');
// AuthFunctions
const AuthFunctions = require('../../auth/utils/auth_functions');
const auth_functions = new AuthFunctions();
// SMTP functions
const { sendEmailVerificationLink } = require('./utils/email_functions');


router.post('/login', validatorHandler(postAuthLogin, 'body'), auth_functions.localAuthenticateUser(), login);
router.post('/register', validatorHandler(postAuthRegisterSchema, 'body'), register);
router.get('/confirmation/:emailToken', updateConifrmedStatus);

async function login(req, res, next) {
    try {
        const user = req.user[0];
        if (user.confirmed){
            const token= auth_functions.createUserToken(user);
            res.json({user, token});
        }else{
            throw next(Error('Please, confirm your email before login.'));
        }
    } catch (error) {
        next(error);
    }
}

async function register (req, res, next){
    let userData = req.body;
    userData.password = await auth_functions.encryptPassword(userData.password);

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
        const sub = auth_functions.verifyToken(req.params.emailToken);

        Controller.update_user({confirmed: true}, sub)
            .then((data) =>{
                res.send('User confirmed. Now you can login.');
            })
            .catch((error) =>{
                next(error);
            });
    } catch (error) {
        next(boom.unauthorized('Unvalid token.'));
    }
}

module.exports = router;