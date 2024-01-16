const express = require('express');
const router = express.Router();
const Controller = require('./index');
// Auth
const passport = require('passport');
// Schemas
const { getCareerSchema, createCareerSchema, putCareerSchema, patchCareerSchema } = require('../../schemas/career.schema');
// Middlewares
const {validatorHandler} = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');


router.get('/', get);
router.get('/:id', validatorHandler(getCareerSchema, 'params'), get_by_id);
router.post('/', passport.authenticate('jwt', {session:false}), checkRoles('ADMIN'), validatorHandler(createCareerSchema, 'body'), post);
router.put('/:id', passport.authenticate('jwt', {session:false}), checkRoles('ADMIN'), validatorHandler(putCareerSchema, 'body'), put);
router.patch('/:id', passport.authenticate('jwt', {session:false}), checkRoles('ADMIN'), validatorHandler(patchCareerSchema, 'body'), put);
router.delete('/:id', passport.authenticate('jwt', {session:false}), checkRoles('ADMIN'), delete_by_id);

async function get(req, res, next) {
    Controller.list()
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            next(err);
        });
}

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

async function post(req, res, next) {
    const data = req.body;
        Controller.insert(data)
            .then((data) =>{
                console.log(data);
                res.send(data);
            })
            .catch((err) =>{
                next(err);
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
            next(err);
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
            next(err);
        });
}

module.exports = router;