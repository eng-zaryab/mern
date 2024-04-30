const Products = require('../models/product');
const dotenv = require("dotenv");
const connectDatabase = require('../config/database');

const products = require('../data/products');


// Setting config file
dotenv.config({ path: 'backend/config/config.env'});
connectDatabase();

const seedProducts = async () => {
    try {
        await Products.deleteMany();
        console.log('Products deleted');

        // Insert new products
        await Products.insertMany(products);
        console.log('All products are added');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
