const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistSchema = require('../models/blacklist.model')

module.exports.authUser = async (req, res, next) => {
    try {
        let token = null;
        
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers && req.headers.authorization) {
            // Expect header in format: "Bearer <token>"
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
                token = parts[1];
            } else {
                // Fallback: header might be the token directly
                token = req.headers.authorization;
            }
        }
        const isBlacklisted = await BlacklistSchema.findOne({token:token});
        if(isBlacklisted){
            return res.status(401).json({message:'Unathorized'})
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.log('Auth middleware error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req,res,next) =>{
    let token = null;
    if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    } else if(req.headers && req.headers.authorization){
        token = req.headers.authorization.split(' ')[1];
    }   
    
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlacklisted = await BlacklistSchema.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:'Unathorized'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.captainId = decoded._id;
        next();
    } catch (error) {
        console.log('Auth middleware error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }  
        return res.status(401).json({ message: 'Unauthorized' });
    }
}