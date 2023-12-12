const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const user = require('./components/user/network');

app.use(express.json());

//Routes components
app.use('/api/user', user);

app.get('/api/', (req, res)=>{
    res.send('API Blog coming soon...');
})

app.listen(port, ()=>{
    console.log(`API running in port ${port}`);
});
