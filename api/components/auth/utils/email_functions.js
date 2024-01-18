// Api
const config = require('../../../../config/index');
// Auth
const jwt = require('jsonwebtoken');

// TODO: Agregar documentación de https://www.npmjs.com/package/sib-api-v3-sdk
// Brevo/SendBlue (SMTP server)
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.api_smtp.api_key;

// // TODO: Cambiar el email sender a un correo de cuenta administrativa
const sender = {
    email: config.api_smtp.email,
    name: 'ITC admin'
};
const apiUrl = `http://${config.api.host}:${config.api.port}`

// express-rate-limit to limit the user requests
// request time out for the senEmail function
async function sendEmailVerificationLink(id_user_blogger, email) {
    const payload = {
        sub: id_user_blogger,
    }
    const emailToken = jwt.sign(payload, config.api.secret, {expiresIn: '1h'});
    const confirmationURL = `${apiUrl}/api/auth/confirmation/${emailToken}`;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
   
    const receivers = [{email: email}];

    try {
        apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Blog TECnM confirmation link",
            htmlContent: `<p>This is your confirmation link, click on it to confirm your account: </p>
            <a href="${confirmationURL}">${confirmationURL}</a>
            <strong>This link wont be valid in 30 minutes</strong>`
        }); 
    } catch (error) {
        throw('Error(error)');
    }
}

module.exports = {
    sendEmailVerificationLink, 
}
