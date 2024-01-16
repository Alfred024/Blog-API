// Express 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Components
const user = require('./components/user_blogger/network');
const blogger = require('./components/blogger/network');
const auth = require('./components/auth/network');
const blog = require('./components/blog/network');
const career = require('./components/career/network');
// Error functions
const {printErrors, errorHandler, boomErrorHandler,} = require('./middlewares/error.handler');
// Documentation
const swaggerDocs = require('./swagger/network');
//Auth Strategies 
require('./auth/index');


//Routes components
app.use('/api/user_blogger', user);
app.use('/api/blogger', blogger);
app.use('/api/auth', auth);
app.use('/api/blog', blog);
app.use('/api/career', career)

//Error middleware handler
app.use(printErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//Swagger API documentaion
app.use('/api-docs', swaggerDocs);

app.get('/api/', (req, res)=>{
    res.send('API Blog coming soon...');
})

app.listen(port, ()=>{
    console.log(`API running in port ${port}`);
});
