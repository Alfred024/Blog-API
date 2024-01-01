const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const { checkOwner } = require('../../middlewares/auth.handler');

const { getBloggerSchema, createBloggerSchema, updateBloggerSchema } = require('../../schemas/blogger.schema');

const Controller = require('./index');

const router = express.Router();

// Implementar que aunque no sea el owner, si el usuario es 'ADMIN' pueda hacer un put o delete

//Proteger la respuesta de el método get para que no muestre las contraseñas
router.get('/', passport.authenticate('jwt', {session:false}), get);
router.get('/my-blogs', passport.authenticate('jwt', {session:false}), get_my_blogs);
router.post('/', validatorHandler(createBloggerSchema, 'body'), post);
router.put('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), validatorHandler(updateBloggerSchema, 'body'), put);
router.delete('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), delete_by_id);


async function get(req, res, next) {
    Controller.list()
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

async function get_my_blogs(req, res, next) {
    const {sub} = req.user;
    const data = {
        "endpoint": "my-blogs",
        "main_table": "blog",
        "secondary_table": "blogger",
        "id_secondary_table": "id_blogger",
        "id": sub
    };
    Controller.get(data)
        .then((data) =>{
            console.log(data);
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

// Manejar que en la D.B. se ingrese los datos de tipo fecha automáticamente
async function post(req, res, next) {
    const data = req.body;
    Controller.insert(data)
        .then((data) =>{
            console.log(data);
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

async function put(req, res, next) {
    const data = req.body;
    const id = req.params.id;
    Controller.update(data, id)
        .then((data) =>{
            console.log(data);
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

async function delete_by_id(req, res, next) {
    const id = req.params.id;
    Controller.delete_by_id(id)
        .then((data) =>{
            console.log(data);
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

module.exports = router;