const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const { getCareerSchema, createCareerSchema, putCareerSchema, patchCareerSchema } = require('../../schemas/career.schema');
const { checkRoles } = require('../../middlewares/auth.handler');


const Controller = require('./index');

const router = express.Router();

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