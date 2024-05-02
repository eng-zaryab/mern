const express = require('express');
const router = express.Router();

const {registerUser, userLogin} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);

module.exports = router;