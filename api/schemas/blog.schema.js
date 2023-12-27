const Joi = require('joi');

const id = Joi.number();
const content = Joi.string();
const id_blogger = Joi.number();
const title = Joi.string().max(200);
const slug = Joi.string().max(50);
const description = Joi.string().max(150);


const getBlogSchema = Joi.object({
    id: id.required(),
});

const createBlogSchema = Joi.object({
    content: content.required(),
    id_blogger: id_blogger.required(),
    title: title.required(),
    slug: slug.required(),
    description: description.required(),
});

const updateBlogSchema = Joi.object({
    content: content,
    //id_blogger: id_blogger.required(),
    title: title,
    slug: slug,
    description: description,
});

module.exports = { getBlogSchema, createBlogSchema, updateBlogSchema };