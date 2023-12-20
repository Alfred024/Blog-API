const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const id = Joi.number();
const email = Joi.string().email();
//Modificar las características de la contrasñe de acuerdo a lo que diga el POU
const password = Joi.string().min(6);
//Este dato es una clase de enum, habría que pregunta a Uri cuál 
const role = Joi.string().min(5);

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
    role: role.required()
});

const updateUserBloggerSchema = Joi.object({
    password: password, 
    role: role,
});

module.exports = { getUserBloggerSchema, createUserBloggerSchema, updateUserBloggerSchema };