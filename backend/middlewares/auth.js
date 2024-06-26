
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Check users if Authenticated
exports.isAuthentecatedUser = catchAsyncErrors ( async (req, res, next) =>{
    const { token } = req.cookies;

   if(!token) {
    return next(new ErrorHandler('Please login to access this route', 401))
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id);

   next()
})