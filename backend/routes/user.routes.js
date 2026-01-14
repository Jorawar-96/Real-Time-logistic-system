const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const userControllers = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
userControllers.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password is incorrect')
],userControllers.loginUser)


// Support GET /profile for compatibility with frontend
router.get('/profile', authMiddleware.authUser, userControllers.getUserProfile);
router.post('/profile',authMiddleware.authUser,userControllers.getUserProfile)

router.post('/logout', authMiddleware.authUser, userControllers.logoutUser);

// keep GET for backward compatibility
router.get('/logout', authMiddleware.authUser, userControllers.logoutUser) 

module.exports = router;