const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/', (req, res)=>{
    res.send('Blog API coming soon...')
});

app.listen(port, ()=>{
    console.log('Blog API listening on port 3000');
});