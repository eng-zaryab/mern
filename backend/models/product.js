const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        trim: true,
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price cnnot be empty'],
        trim: true,
        maxlength: [5, 'Price must be in digits'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please add description to product'],
        trim: true,
    },
    rattings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select product category'],
        enum: {
            values: ['Electronics', 'Cameras', 'Laptop', 'Accessories','Headphones', 'Food', 'Books', 'Cloths/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home'],
            message: 'Please select a valid category'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please add seller name'],
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock'],
        maxlength: [5, 'Stock must be in digits'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Products', productSchema);