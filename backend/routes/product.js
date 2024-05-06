const express = require('express');

const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct
} = require('../controllers/productController');

const {isAuthentecatedUser} = require('../middlewares/auth');

router.route('/products').get(isAuthentecatedUser, getProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/products/new').post(newProduct);
router.route('/admin/products/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;