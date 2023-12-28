const express = require('express');
const passport = require('passport');
const {validatorHandler} = require('../../middlewares/validator.handler');
const { getCareerSchema, createCareerSchema, updateCareerSchema } = require('../../schemas/career.schema');

const Controller = require('./index');

const router = express.Router();

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

router.get('/my-blogs', 
    passport.authenticate('jwt', {session: false}),

    (req, res)=>{
        const {sub} = req.user;
        Controller.get(sub)
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
    validatorHandler(createCareerSchema, 'body'),
    (req, res)=>{
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
    validatorHandler(updateCareerSchema, 'body'),
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