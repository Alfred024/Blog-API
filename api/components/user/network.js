const express = require('express');

const Controller = require('./index');

const router = express.Router();

//Agregar middleware que maneje el despliegue de mensaje de el estado de la respuesta (dependencia boom para code status)
router.get('/', (req, res)=>{
    Controller.get()
        .then((data) =>{
            console.log(data);
        })
        .catch((err) =>{
            console.log(err);
        });
        res.send('USER route');
});

module.exports = router;