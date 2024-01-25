const express = require('express');
const router = express.Router();
const Controller = require('./index');
//Middlewares
const { validatorHandler } = require('../../middlewares/validator.handler');
const { checkApiKey } = require('../../middlewares/auth.handler')
//JOI schemas
const { postAuthLogin, postRegisterAdminSchema, postRegisterUserSchema, postRegisterBloggerSchema } = require('../../schemas/auth.schema');
//Errors
const boom = require('@hapi/boom');
// AuthFunctions
const AuthFunctions = require('../../auth/utils/auth_functions');
const auth_functions = new AuthFunctions();
//AuthHelpers
const { getUserBloggerByEmail, updateUserPassword, createBlogger } = require('./helpers/db_queries_functions');
// SMTP functions
const { sendEmailVerificationLink } = require('./helpers/email_functions');

//router.get('/renew-token', auth_functions.refreshUserToken());
router.post('/login', validatorHandler(postAuthLogin, 'body'), auth_functions.localAuthenticateUser(), login);
// Agregar middleware de checkApiKey
router.post('/register-new-admin', validatorHandler(postRegisterAdminSchema, 'body'), registerNewAdmin);
// Agregar middleware de checkApiKey
router.post('/register-by-admin',  validatorHandler(postRegisterUserSchema, 'body'), registerUserByAdmin);
router.post('/register', validatorHandler(postRegisterBloggerSchema, 'body'), register_user);

// Para el login pedirá el token que se le creó al hacer el registro???
async function login(req, res, next) {
    try {
        const user = req.user[0];
        const token = auth_functions.createUserToken(user.email, user.id_user_blogger, user.role);
        res.json({user, token});
    } catch (error) {
        next(error);
    }
}
async function registerNewAdmin(req, res, next) {
    const userData = req.body;
    userData.password = await auth_functions.encryptPassword(userData.password);
    userData.role = 'ADMIN';

    Controller.register(userData)
        .then(async (data) => {
            res.send(`ADMIN user registered succesfully`);
        })
        .catch((err) =>{
            next(err);
        });
}
async function registerUserByAdmin (req, res, next){
    const userData = req.body;
    userData.role = 'NORMAL';
    let userFounded;
    
    await getUserBloggerByEmail(userData.email)
        .then((user) => {
            userFounded = user;
        })
        .catch((err) => {
            next(err)
        });
    
    if(userFounded){
        next(Error(`User with email ${userData.email} already exists.`));
    }
    
    Controller.register(userData)
        .then(async (data) => {
            await sendEmailVerificationLink(userData.email, next);
            res.send(`Email sended succesfully to ${userData.email}`);
        })
        .catch((err) =>{
            next(Error(`Error trying to do user register.`));
        });
}

// Usuario crea su cuenta con el emailToken
async function register_user(req, res, next) {
    // Me mande el email y el 
    let userData = req.body;
    try {
        userData.password = await auth_functions.encryptPassword(userData.password);
    } catch (error) {
        next(Error('Token expired'));
    }

    try {
        // #1.- Get user by email, 
        let user;
        await getUserBloggerByEmail(userData.email)
            .then((userFounded) => {
                user = userFounded;
            })
            .catch((err) => {
                next(err)
            });

        userData.id_user_blogger = user.id_user_blogger;
        userData.role = user.role;
        // #2.- Update User Password
        await updateUserPassword(req, res, next, userData);
        
        // #3.- Create Blogger
        await createBlogger(userData)
            .then((response) => { 
                res.send(response) 
            })
            .catch((err) =>{next(err)});
    } catch (error) {
        next(Error('Couldnt register the user'));
    }
}


module.exports = router;