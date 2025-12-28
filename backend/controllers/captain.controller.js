const blacklistModel = require('../models/blacklist.model');
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

module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{email,password} = req.body;

    const captain = await captainModel.findOne({email}).select ('+password');

    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token = captain.generateAuthToken();

    // remove password from response and set cookie
    captain.password = undefined;
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async(req,res,next)=>{
    
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async(req,res,next)=> {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    await blacklistModel.create({ token });
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logout successfully' });
}