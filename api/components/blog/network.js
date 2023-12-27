const express = require('express');
const {validatorHandler} = require('../../middlewares/middlewares');
const { getBlogSchema, createBlogSchema, updateBlogSchema } = require('../../schemas/blog.schema');

const Controller = require('./index');

const router = express.Router();

router.get('/', 
    validatorHandler(getBlogSchema, 'param'),
    (req, res)=>{
        Controller.list()
            .then((data) =>{
                console.log(data);
                res.send(data);
            })
            .catch((err) =>{
                console.log(err);
            });
    }
);

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

router.post('/', 
    validatorHandler(createBlogSchema, 'body'),
    async (req, res) =>{
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