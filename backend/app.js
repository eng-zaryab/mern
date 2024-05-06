const express = require('express');
const errorMiddlware = require('./middlewares/errors');

const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products);
app.use('/api/v1', auth);

// Middlware to handle errors
app.use(errorMiddlware);

module.exports = app;