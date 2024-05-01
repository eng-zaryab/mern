const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Creating a new Product => api/v1/Admin/products/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
})

// Get all Products => api/v1/products
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocument()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    });
})

// Get single Product details => api/v1/products/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Update Product details => api/v1/products/:id
exports.updateProduct = catchAsyncErrors (async(req, res, next) => {
    let product = await Product.findByIdAndUpdate(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product => api/v1/Admin/products/:id
exports.deleteProduct = catchAsyncErrors (async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})


