const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const numOfCareers = 10;
// User Blogger fields
const email = Joi.string();
const password = Joi.string();
// Bloger fields
const id_user_blogger = Joi.number();
const name = Joi.string().max(100);
const first_username = Joi.string().max(80);
const second_username = Joi.string().max(80);
const id_career = Joi.number().min(0).max(numOfCareers-1);


const postAuthLogin = Joi.object({
    email: email.required(),
    password: password.required(),
});

const postRegisterAdminSchema = Joi.object({
    email: email.required(), 
    password: password.required(),
});

const postRegisterUserSchema = Joi.object({
    email: email.required(), 
});

const postRegisterBloggerSchema = Joi.object({
    email: email.required(), 
    password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .required(),
    name: name.required(),
    first_username: first_username.required(),
    second_username: second_username.required(),
    id_career: id_career.required(),
});

module.exports = { postAuthLogin, postRegisterAdminSchema,  postRegisterUserSchema, postRegisterBloggerSchema, }