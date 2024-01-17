// Auth dependencies
const {Strategy} = require('passport-local');
const bcrypt = require('bcrypt');
// Errors handle
const boom = require('@hapi/boom');

const Controller = require('../../components/auth/index');
var LocalStrategy = new Strategy( 
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    function verify(email, password, done){
        const data = {
            "table": "user_blogger",
            "param_name": "email",
            "param_value": email
        };
        Controller.get_user_blogger_by_email(data)
            .then( async (user) => {
                if ( !user[0]) {
                    throw boom.notFound(`No user found with the email: ${email}`);
                }
                const isMatch = await bcrypt.compare(password, user[0].password);
                if (!isMatch) {
                    throw boom.unauthorized(`The password are not correct`);
                }
                delete user[0].password;
                done(null, user);
            })
            .catch((err) =>{
                done(boom.serverUnavailable(err));
            });
  }
);

module.exports = LocalStrategy;