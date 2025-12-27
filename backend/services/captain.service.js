const captainModel = require('../models/captain.model');

module.exports.createCaptain = async({
    firstname,lastname,email,password,color,plate,capacity,vehicleType
})=>{
    //all fields are must required..!
    if(!firstname || !email || !password ||!color ||!plate || !capacity || !vehicleType){
        throw new Error('All Fields are required');
    }
    //creating captain
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain
}