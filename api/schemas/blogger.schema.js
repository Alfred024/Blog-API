const Joi = require('joi');

const numOfCareers = 10;

const id = Joi.number();
const name = Joi.string().max(100);
const first_username = Joi.string().max(80);
const second_username = Joi.string().max(80);
const id_career = Joi.number().min(0).max(numOfCareers-1);

const getBloggerSchema = Joi.object({
    id: id.required(),
});

const createBloggerSchema = Joi.object({
    name: name.required(),
    first_username: first_username.required(),
    second_username: second_username.required(),
    id_career: id_career.required(),
});

const updateBloggerSchema = Joi.object({
    name: name,
    first_username: first_username,
    second_username: second_username,
    id_career: id_career,
});

module.exports = { getBloggerSchema, createBloggerSchema, updateBloggerSchema };