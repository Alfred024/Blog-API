const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const { checkOwner } = require('../../middlewares/auth.handler');

const { getBloggerSchema, createBloggerSchema, putBloggerSchema, patchBloggerSchema } = require('../../schemas/blogger.schema');

const Controller = require('./index');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), get);
router.get('/my-blogs', passport.authenticate('jwt', {session:false}), get_my_blogs);
router.post('/', validatorHandler(createBloggerSchema, 'body'), passport.authenticate('jwt', {session:false}), post);
// TODO: Agregar la función de validar si el usuario user_blogger es propietario del bolgger, si no, que no pueda editar
//router.put('/:id', passport.authenticate('jwt', {session:false}), checkOwner(), validatorHandler(updateBloggerSchema, 'body'), put);
router.put('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(putBloggerSchema, 'body'), put);
router.patch('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(patchBloggerSchema, 'body'), patch);
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
    let id_user_blogger;
    const joinData = {
        "endpoint": "my-blogs",
        "main_table": "blogger",
        "secondary_table": "user_blogger",
        "id_secondary_table": "id_user_blogger",
        "id": req.user.sub,
    };
    await Controller.get(joinData)
        .then((blogger) =>{
            id_user_blogger = blogger[0].id_blogger;
        })
        .catch((err) =>{
            console.log(err);
        });

    const data = {
        "endpoint": "my-blogs",
        "main_table": "blog",
        "secondary_table": "blogger",
        "id_secondary_table": "id_blogger",
        "id": id_user_blogger
    };
    Controller.get(data)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

async function post(req, res, next) {
    let data = req.body;
    data.id_user_blogger = req.user.sub;
    Controller.insert(data)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

// async function get_id_blogger(req, res, next) {
//     const id_user_blogger = req.user.sub;
//     const joinData = {
//         "endpoint": "my-blogs",
//         "main_table": "blogger",
//         "secondary_table": "user_blogger",
//         "id_secondary_table": "id_user_blogger",
//         "id": id_user_blogger,
//     };
    
//     Controller.get(joinData)
//         .then((blogger) =>{
//             return user = {
//                 "sub": blogger[0].id_blogger,
//             };
//             //next(user);
//         })
//         .catch((err) =>{
//             console.log(err);
//             throw Error(`The blogger couldntbe found`)
//         });
// }

async function put(req, res, next) {
    const data = req.body;
    const id = req.params.id;
    Controller.update(data, id)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

async function patch(req, res, next) {
    const data = req.body;
    const id = req.params.id;
    Controller.update(data, id)
        .then((data) =>{
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
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
}

module.exports = router;