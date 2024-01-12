const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const { checkRoles, checkOwner } = require('../../middlewares/auth.handler');

const { getUserBloggerSchema, putUserBloggerSchema, patchUserBloggerSchema, } = require('../../schemas/user_blogger.schema');

const Controller = require('./index');

// Implementar que aunque no sea el owner, si el usuario es 'ADMIN' pueda hacer CRUD
router.get('/', passport.authenticate('jwt', {session:false}), checkRoles('ADMIN'), get);
router.get('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), validatorHandler(getUserBloggerSchema, 'params'), get_by_id);
router.put('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), validatorHandler(putUserBloggerSchema, 'body'), put);
router.patch('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), validatorHandler(patchUserBloggerSchema, 'body'), patch);
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

async function put(req, res, next) {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 5);
    const id = req.params.id;
    Controller.update(data, id)
        .then((data) =>{
            console.log(`DB message: ${data}`);
            res.send('User succesfully updated');
        })
        .catch((err) =>{
            console.log(err);
        });
}

async function patch(req, res, next) {
    let data = req.body;

    if(data.password){
        data.password = await bcrypt.hash(data.password, 5);
    }

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
            console.log(`DB message: ${data}`);
            res.send('User succesfully deleted');
        })
        .catch((err) =>{
            console.log(err);
        });
}

module.exports = router;