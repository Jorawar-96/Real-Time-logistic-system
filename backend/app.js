const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app= express();
const cors = require('cors');
const connecttodb = require('./db/db')
const userRoutes = require('./routes/user.routes')


connecttodb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Ram ram bhai saryian n...!")
})

app.use('/users',userRoutes)


module.exports= app;