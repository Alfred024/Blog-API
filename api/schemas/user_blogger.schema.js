const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const id = Joi.number();
const email = Joi.string().email();
//Modificar las características de la contrasñe de acuerdo a lo que diga el POU
const password = Joi.string().min(6);

//Modificarlo para que sólo acepte "ADMIN" o "NORMAL"
const role = Joi.string().min(5).uppercase();

const getUserBloggerSchema = Joi.object({
    id: id.required(),
});

const createUserBloggerSchema = Joi.object({
    email: email.required(),
    password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .required(),
});

const putUserBloggerSchema = Joi.object({
    password: password.required(), 
});

const patchUserBloggerSchema = Joi.object({
    password: password, 
});

module.exports = { 
    getUserBloggerSchema, createUserBloggerSchema, putUserBloggerSchema, patchUserBloggerSchema, 
};