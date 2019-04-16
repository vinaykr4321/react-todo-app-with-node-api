const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("<h1>Hello, World</h1>");
});

app.use('/api/todos',todoRoutes);



app.listen(2000,()=>{
    console.log("Node Server started at Port number : 2000");
})