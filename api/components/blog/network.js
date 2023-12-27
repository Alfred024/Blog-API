const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const {checkRoles} = require('../../middlewares/auth.handler');
const { getBlogSchema, createBlogSchema, updateBlogSchema } = require('../../schemas/blog.schema');

const Controller = require('./index');

const router = express.Router();

router.get('/:id', 
    (req, res)=>{
        const id = req.params.id;
        Controller.get(id)
            .then((data) =>{
                console.log(data);
                res.send(data);
            })
            .catch((err) =>{
                console.log(err);
            });
    }
);

//Arreglar el registro automático en la base de datos de los campos de tipo fecha
router.post('/', 
    passport.authenticate('jwt', {session: false}),
    checkRoles('ADMIN', 'NORMAL'),
    validatorHandler(createBlogSchema, 'body'),
    (req, res) =>{
        console.log('Creation of a post.Authorized because send of token');
        res.send('Authorized to post a blog');
    }
    // async (req, res) =>{
    //     const data = req.body;
    //     Controller.insert(data)
    //         .then((data) =>{
    //             console.log(data);
    //             res.send(data);
    //         })
    //         .catch((err) =>{
    //             console.log(err);
    //         });
    // }
);

router.put('/:id', 
    validatorHandler(updateBlogSchema, 'body'),
    (req, res) =>{
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
);

router.delete('/:id', (req, res) =>{
    const id = req.params.id;
    Controller.delete_by_id(id)
        .then((data) =>{
            console.log(data);
            res.send(data);
        })
        .catch((err) =>{
            console.log(err);
        });
});

module.exports = router;