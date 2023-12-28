const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(70);
const key = Joi.string().max(30);

const getCareerSchema = Joi.object({
    id: id.required(),
});

const createCareerSchema = Joi.object({
    key: key.required(),
    name: name.required(),
});

const updateCareerSchema = Joi.object({
    key: key,
    name: name,
});

module.exports = { getCareerSchema, createCareerSchema, updateCareerSchema };