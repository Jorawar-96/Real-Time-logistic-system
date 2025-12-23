const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app= express();
const cors = require('cors');


app.get('/',(req,res)=>{
    res.send("Ram ram bhai saryian n...!")
})

module.exports= app;