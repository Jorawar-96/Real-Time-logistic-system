const userModel = require('../models/user.model');


module.exports.createUser = async({
    firstname,lastname,email,password
})=>{
    //all fields are must required..!
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    
    //Creating a user entries...!
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}