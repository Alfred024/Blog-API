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

    // Data
// API URL 
const url = `http://${config.api.host}:${config.api.port}`


// Check if the user is confirmed
async function tryLogin(){

}
// express-rate-limit to limit the user requests
// request time out for the senEmail function
async function sendEmailVerificationLink(id_user_blogger, email) {
    const emailToken = jwt.sign({sub: id_user_blogger}, config.api_smtp.password, {expiresIn: '30m'});
    const confirmationURL = `${url}/confirmation/${emailToken}`;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
        email: config.api_smtp.email,
        name: 'Alfredo'
    };
    const receivers = [{email: email}];
    try {
        apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Blog TECnM confirmation link",
            // Actualizar el HTML a uno más bonito y hacer que el link de referncia funcione.
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
