const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register a new USER => api/v1/register
exports.registerUser = catchAsyncErrors ( async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'xilhbim0lnecc0v6y6th',
            url: 'https://res.cloudinary.com/divawbklk/image/upload/v1714633220/xilhbim0lnecc0v6y6th.jpg'
        }
    });

    // Setting security token
    const token = user.getJwtToken();


    res.status(201).json({
        success: true,
        token
    })
})

// User Login => api/v1/login
exports.userLogin = catchAsyncErrors (async (req, res, next) => {
    const { email, password} = req.body;

    // Checking if email or password is entered by user
    if(!email || !password) {
        return next (new errorHandler('Please enter email and password to login', 400))
    }

    // Finding user in database
    const user = await User.findOne({email}).select('+password')
    if(!user) {
        return next (new errorHandler('Invalid cridentials, Please check your email or password and try again', 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next (new errorHandler('Password does not match', 401))
    }

    const token = user.getJwtToken();
    res.status(200).json({
        success: true,
        token
    })
})

