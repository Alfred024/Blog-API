const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const email = Joi.string();
const password = Joi.string();

const postAuthLogin = Joi.object({
    email: email.required(),
    password: password.required(),
});

const postAuthRegisterSchema = Joi.object({
    email: email.required(),
    password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .required(),
});


module.exports = { postAuthLogin, postAuthRegisterSchema }