const mongoose = require('mongoose');

function connecttodb(){
    mongoose.connect(process.env.MONGODB_URI,{
       
    }).then(()=>{
        console.log("Connected to MongoDB successfully");
    }).catch((err)=>{
        console.log("Failed to connect to MongoDB",err);
    })
} 


module.exports= connecttodb;