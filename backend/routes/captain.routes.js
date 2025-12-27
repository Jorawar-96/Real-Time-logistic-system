const captainController = require('../controllers/captain.controller')
const express = require('express');
const router = express.Router();
const {body} = require("express-validator")

//registration fields for captain
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1 characters long'),
    body('vehicle.vehicleType').isIn(['Car','Motorcycle','Auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

module.exports = router;