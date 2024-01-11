const Joi = require('joi');

const id = Joi.number();
const content = Joi.string();
const title = Joi.string().max(200);
const slug = Joi.string().max(50);
const description = Joi.string().max(150);

const getBlogSchema = Joi.object({
    id: id.required(),
});

const createBlogSchema = Joi.object({
    content: content.required(),
    title: title.required(),
    slug: slug.required(),
    description: description.required(),
});

const putBlogSchema = Joi.object({
    content: content.required(),
    title: title.required(),
    slug: slug.required(),
    description: description.required(),
});

const patchBlogSchema = Joi.object({
    content: content,
    title: title,
    slug: slug,
    description: description,
});

module.exports = { getBlogSchema, createBlogSchema, putBlogSchema, patchBlogSchema, };