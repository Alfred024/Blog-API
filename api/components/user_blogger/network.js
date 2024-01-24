const express = require('express');
const router = express.Router();
const Controller = require('./index');
// AuthFunctions
const AuthFunctions = require('../../auth/utils/auth_functions');
const auth_functions = new AuthFunctions();
// Middlewares
const { checkRoles, checkOwner } = require('../../middlewares/auth.handler');
const {validatorHandler} = require('../../middlewares/validator.handler');
// Schemas
const { getUserBloggerSchema, putUserBloggerSchema, patchUserBloggerSchema, } = require('../../schemas/user_blogger.schema');
// Boom errors
const boom = require('@hapi/boom');


// TODO: Implementar que aunque no sea el owner, si el usuario es 'ADMIN' pueda hacer CRUD
router.get('/', auth_functions.jwtAuthenticateUser(), get);
router.get('/:id', auth_functions.jwtAuthenticateUser(), checkOwner(), validatorHandler(getUserBloggerSchema, 'params'), get_by_id);
router.put('/:id', auth_functions.jwtAuthenticateUser(), checkOwner(), validatorHandler(putUserBloggerSchema, 'body'), put);
router.patch('/:id', auth_functions.jwtAuthenticateUser(), checkOwner(), validatorHandler(patchUserBloggerSchema, 'body'), patch);
router.delete('/:id', auth_functions.jwtAuthenticateUser(), checkOwner(), delete_by_id);

async function get(req, res, next) {
    Controller.list()
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            next(boom.serverUnavailable(err));
        });
}
// No id found || Connection Refused
async function get_by_id(req, res, next) {
    const id = req.params.id;
    Controller.get(id)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            next(err);
        });
}
// No id found || Connection Refused
async function put(req, res, next) {
    let data = req.body;
    data.password = await auth_functions.encryptPassword(data.password);
    const id = req.params.id;
    Controller.update(data, id)
        .then((data) =>{
            console.log(`DB message: ${data}`);
            res.send('User succesfully updated');
        })
        .catch((err) =>{
            next(err);
        });
}
// No id found || Connection Refused
async function patch(req, res, next) {
    let data = req.body;

    if(data.password){
        data.password = await auth_functions.encryptPassword(data.password);
    }

    const id = req.params.id;
    Controller.update(data, id)
        .then((data) =>{
            console.log(data);
            res.send(data);
        })
        .catch((err) =>{
            next(err);
        });
}
// No id found || Connection Refused
async function delete_by_id(req, res, next) {
    const id = req.params.id;
    Controller.delete_by_id(id)
        .then((data) =>{
            console.log(`DB message: ${data}`);
            res.send('User succesfully deleted');
        })
        .catch((err) =>{
            next(err);
        });
}

module.exports = router;