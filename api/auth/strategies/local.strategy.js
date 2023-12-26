const {Strategy} = require('passport-local');
const bcrypt = require('bcrypt');

const Controller = require('../../components/auth/index');
var LocalStrategy = new Strategy( 
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    function verify(email, password, done){
        Controller.get_user_blogger_by_email(email)
            .then( async (user) => {
                if (!user) {
                    done(`No user found with the email: ${email}`, false);
                }
                const isMatch = await bcrypt.compare(password, user[0].password);
                if (!isMatch) {
                    done(`The email or password are not correct`, false);
                }
                delete user[0].password;
                done(null, user);
            })
            .catch((err) =>{
                console.log('NO SE PUEDE ASÍ');
                done(err, false);
            });
  }
);

module.exports = LocalStrategy;