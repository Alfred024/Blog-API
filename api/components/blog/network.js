const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const {checkRoles, checkOwner} = require('../../middlewares/auth.handler');
const { getBlogSchema, createBlogSchema, updateBlogSchema } = require('../../schemas/blog.schema');

const Controller = require('./index');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), get);
router.get('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getBlogSchema, 'params'), get_by_id);
router.post('/', passport.authenticate('jwt', {session:false}), validatorHandler(createBlogSchema, 'body'), post);
router.put('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(updateBlogSchema, 'body'),checkOwner(), put);
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

async function get_by_id(req, res, next) {
    const id = req.params.id;
    Controller.get(id)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}


//Arreglar el registro automático en la base de datos de los campos de tipo fecha
async function post(req, res, next) {
    const data = req.body;
    data.id_blogger = req.user.sub;
    res.send(data);
    // Controller.insert(data)
    //     .then((data) =>{
    //         console.log(data);
    //         res.send(data);
    //     })
    //     .catch((err) =>{
    //         console.log(err);
    //     });
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