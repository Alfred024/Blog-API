const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const swaggerDocs = require('./swagger/network');
const user = require('./components/user_blogger/network');

app.use(express.json());

//Routes components
app.use('/api/user_blogger', user);
app.use('/api-docs', swaggerDocs);

app.get('/api/', (req, res)=>{
    res.send('API Blog coming soon...');
})

app.listen(port, ()=>{
    console.log(`API running in port ${port}`);
});
