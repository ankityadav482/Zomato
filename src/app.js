// create server

const cookieParser = require('cookie-parser');
const express = require('express')
const authRoutes = require('./routes/auth.routes');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.use('/api/auth',authRoutes);

module.exports=app;