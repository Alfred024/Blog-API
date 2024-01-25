const express = require('express');
const router = express.Router();
const Controller = require('./index');
// Auth
const passport = require('passport');
// Schemas
const { getBlogSchema, createBlogSchema, putBlogSchema, patchBlogSchema, queryBlogSchema } = require('../../schemas/blog.schema');
// Middlewares
const {validatorHandler} = require('../../middlewares/validator.handler');
const {checkRoles, checkOwner} = require('../../middlewares/auth.handler');

router.get('/', get);
router.get('/:id', validatorHandler(getBlogSchema, 'params'), get_by_id);
router.post('/', passport.authenticate('jwt', {session:false}), validatorHandler(createBlogSchema, 'body'), post);
router.put('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(putBlogSchema, 'body'),checkOwner(), put);
router.put('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(patchBlogSchema, 'body'),checkOwner(), put);
router.delete('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), delete_by_id);

async function get(req, res, next) {
    let limit = req.query.limit;
    let offset = req.query.offset;

    if (!limit || !offset){
        limit = 5;
        offset = 0;
    }
    console.log('limit: '+ limit);
    console.log('offset: '+offset);
    Controller.get_blogger({'limit': limit, 'offset': offset})
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
    let id_user_blogger;
    const joinData = {
        "endpoint": "my-blogs",
        "main_table": "blogger",
        "secondary_table": "user_blogger",
        "id_secondary_table": "id_user_blogger",
        "id": req.user.sub,
    };
    await Controller.get_blogger(joinData)
        .then((blogger) =>{
            id_user_blogger = blogger[0].id_blogger;
            console.log('id del blogger: '+id_user_blogger);
        })
        .catch((err) =>{
            next(err);
        });

    data.id_blogger = id_user_blogger;
    data.date_last_change = new Date().toISOString();
    data.date_publication = new Date().toISOString();

    Controller.insert(data)
        .then((data) =>{
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