const express = require('express');
const passport = require('passport');
//require('../../auth/index');

const LocalStrategy = require('../../auth/strategies/local.strategy');
passport.use(LocalStrategy);

const router = express.Router();

router.post('/login', 
    passport.authenticate('local', {session: false}),
    async (req, res) =>{
        try {
            //res.send('Authentication succesful ');
            res.send(req.user);
        } catch (error) {
            res.send('ERROR catching the USER BY EMAIL')
        }
});


module.exports = router;