const express = require('express');
const bcrypt = require('bcrypt');
const {validatorHandler} = require('../../middlewares/validator.handler');
const {checkApiKey} = require('../../middlewares/auth.handler');

const { getUserBloggerSchema, createUserBloggerSchema, updateUserBloggerSchema } = require('../../schemas/user_blogger.schema');

const Controller = require('./index');

const router = express.Router();

//Agregar middleware que maneje el despliegue de mensaje de el estado de la respuesta (dependencia boom para code status)
router.get('/', 
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
    validatorHandler(createUserBloggerSchema, 'body'),
    async (req, res) =>{
        let data = req.body;
        data.password = await bcrypt.hash(data.password, 5);
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
    checkApiKey,
    validatorHandler(updateUserBloggerSchema, 'body'),
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