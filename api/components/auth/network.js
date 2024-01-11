const express = require('express');
const config = require('../../../config/index');

//Auth 
const secret = config.api.secret;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Handler
const {validatorHandler} = require('../../middlewares/validator.handler')

//JOi schemas
const { postAuthLogin } = require('../../schemas/auth.schema');
const { createUserBloggerSchema } = require('../../schemas/user_blogger.schema');

const Controller = require('./index');

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

            const token = jwt.sign(payload, secret,);
            //const token = jwt.sign(payload, secret, {expiresIn: '15m'});
            
            res.json({user, token});
        } catch (error) {
            res.send('ERROR catching the USER BY EMAIL')
        }
});

router.post('/register', 
    validatorHandler(createUserBloggerSchema, 'body'),
    async (req, res) => {
        let data = req.body;
        data.password = await bcrypt.hash(data.password, 5);
        Controller.register(data)
            .then((data) =>{
                console.log(data);
                res.send(data);
            })
            .catch((err) =>{
                console.log(err);
            });
});


module.exports = router;