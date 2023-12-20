const express = require('express');
const validatorHandler = require('../../middlewares/validator.handler');
const { getUserBloggerSchema, createUserBloggerSchema, updateUserBloggerSchema } = require('../../schemas/user_blogger.schema');

const Controller = require('./index');

const router = express.Router();

//Agregar middleware que maneje el despliegue de mensaje de el estado de la respuesta (dependencia boom para code status)
router.get('/', 
    (req, res)=>{
        Controller.list()
            .then((data) =>{
                console.log(data);
                res.send(data);
            })
            .catch((err) =>{
                console.log('PROBLEMA EN EL GET DLE NEWTWORK USER.JS');
            });
    }
);

module.exports = router;