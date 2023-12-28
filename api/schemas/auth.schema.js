const Joi = require('joi');

const email = Joi.string();
const password = Joi.string();

const postAuthLogin = Joi.object({
    email: email.required(),
    password: password.required(),
});

module.exports = { postAuthLogin }