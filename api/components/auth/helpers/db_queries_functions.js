const Controller = require('../index');
// AuthFunctions
const AuthFunctions = require('../../../auth/utils/auth_functions');
const auth_functions = new AuthFunctions();

// Modify your function to return a promise
function getUserBloggerByEmail(email) {
    return new Promise((resolve, reject) => {
        const data = {
            "table": "user_blogger",
            "param_name": "email",
            "param_value": email
        };

        Controller.get_user_blogger_by_email(data)
            .then((user) => {
                resolve(user[0]);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

async function updateUserPassword(req, res, next, user) {
    Controller.update_user({password: user.password}, user.id_user_blogger)
        .then(() => {
            console.log('User pasword updated.');
        })
        .catch((error) =>{
            next(Error('Couldn´t update the user password. Check console'));
        });
}

// Checar que no se haya creado un blogger
function createBlogger (user){
    return new Promise((resolve, reject) =>{
        const userEmail = user.email;
        const userRole = user.role;
        delete user.email;
        delete user.password;
        delete user.role;

        Controller.create_account(user)
            .then((data) =>{
                const token = auth_functions.createUserToken(userEmail, user.id_user_blogger, userRole);
                resolve({
                    'message': 'Account creation completed. Now you can login',
                    'JWT': token
                });
            })
            .catch((error) =>{
                reject(error);
            });
    });
}

module.exports = {getUserBloggerByEmail, updateUserPassword, createBlogger}