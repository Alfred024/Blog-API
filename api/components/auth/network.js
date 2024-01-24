const express = require('express');
const router = express.Router();
const Controller = require('./index');
//Middlewares
const { validatorHandler } = require('../../middlewares/validator.handler');
//JOI schemas
const { postAuthLogin, postAuthRegisterAdminSchema, postAuthRegisterUserSchema } = require('../../schemas/auth.schema');
//Errors
const boom = require('@hapi/boom');
// AuthFunctions
const AuthFunctions = require('../../auth/utils/auth_functions');
const auth_functions = new AuthFunctions();
// SMTP functions
const { sendEmailVerificationLink } = require('./utils/email_functions');


router.post('/login', validatorHandler(postAuthLogin, 'body'), auth_functions.localAuthenticateUser(), login);
router.post('/register-admin', validatorHandler(postAuthRegisterAdminSchema, 'body'), register_admin);
router.post('/register/:emailToken', validatorHandler(postAuthRegisterUserSchema, 'body'), register_user);

// Para el login pedirá el token que se le creó al hacer el registro???
async function login(req, res, next) {
    try {
        const user = req.user[0];
        const token = auth_functions.createUserToken(user.email);
        
        res.json({user, token});
    } catch (error) {
        next(error);
    }
}

async function register_admin (req, res, next){
    const userData = req.body;

    Controller.register(userData)
        .then(async (data) => {
            await sendEmailVerificationLink(userData.email);
            //res.send(user);
            res.send(`Email sended succesfully to ${userData.email}`);
        })
        .catch((err) =>{
            next(err);
        });
}

async function register_user(req, res, next) {
    let userData = req.body;
    const {email} = auth_functions.verifyToken(req.params.emailToken);
    userData.email = email;
    userData.password = await auth_functions.encryptPassword(userData.password);

    const data = {
        "table": "user_blogger",
        "param_name": "email",
        "param_value": userData.email,
    };
    // #1 Get user by email 
    Controller.get_user_blogger_by_email(data)
        .then(async (user) => {
            try {
                // #2 Update user
                userData.id_user_blogger = user[0].id_user_blogger;
                updateUser(res, next, userData);
            } catch (error) {
                next(Error('Couldnt update user'));
            }
        })
        .catch((err) =>{
            done(boom.serverUnavailable(err));
        });
}

function updateUser(res, next, user) {
    Controller.update_user({password: user.password}, user.id_user_blogger)
        .then(() => {
            try {
                createBlogger(res, next, user);
            } catch (error) {
                next(Error('Couldnt create the blogger'));
            }
        })
        .catch((error) =>{
            next(Error('Couldn´t update the user password. Check console'));
        });
}

function createBlogger (res, next, user){
    const userEmail = user.email;
    delete user.email;
    delete user.password;
    
    Controller.create_account(user)
        .then((data) =>{
            const token = auth_functions.createUserToken(userEmail);
            res.send({
                'message': 'Account creation completed. Now you can login',
                'JWT': token
            });
        })
        .catch((error) =>{
            next(Error('Couldn´t insert data of blogger/user'));
        });
}


module.exports = router;