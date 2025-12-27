const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklist.model')

module.exports.registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()});
    }


    console.log(req.body);

    const {fullname,email,password} = req.body;

    const isUserAlreadyExit = await userModel.findOne({email});
    if(isUserAlreadyExit){
        return res.status(400).json({message:'User already Exist'})
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token,user});
}

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,user})
}

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        // Extract token before clearing cookie
        let token = null;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
                token = parts[1];
            } else {
                token = req.headers.authorization;
            }
        }

        if (token) {
            await blackListTokenModel.create({ token });
        }

        res.clearCookie('token');
        return res.status(200).json({ message: 'logged out' });
    } catch (error) {
        console.log('Logout error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}