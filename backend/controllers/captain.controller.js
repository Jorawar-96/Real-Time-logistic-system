const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')


module.exports.registerCaptain = async(req,res,next)=>{
    //checking the error...!
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehicle} = req.body;

    //email is already login or not checking
    const isCaptainAlreadyExit = await captainModel.findOne({email});
    if(isCaptainAlreadyExit){
        return res.status(400).json({message:'Captain already Exist'})
    }

    //creating hash password from normal password
    const hashedpassword = await captainModel.hashpassword(password);

    //creating captain id
    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    //generating a token for captain id
    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
}