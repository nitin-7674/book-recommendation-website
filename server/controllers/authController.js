const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm } = req.body;
        
        if (password !== passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match'
            });
        }
        
        const newUser = await User.create({
            name,
            email,
            password
        });
        
        const token = signToken(newUser._id);
        
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }
        
        const token = signToken(user._id);
        
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// server/controllers/authController.js
exports.protect = async (req, res, next) => {
    try {
      // 1) Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          status: 'fail',
          message: 'You are not logged in! Please log in to get access.'
        });
      }
  
      // 2) Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(401).json({
          status: 'fail',
          message: 'The user belonging to this token no longer exists.'
        });
      }
  
      // 4) Grant access to protected route
      req.user = currentUser;
      next();
    } catch (err) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid token! Please log in again.'
      });
    }
  };