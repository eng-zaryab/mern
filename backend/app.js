const express = require('express');
const errorMiddlware = require('./middlewares/errors');

const app = express();
app.use(express.json());

// Import all routes
const products = require('./routes/product');

app.use('/api/v1', products);

// Middlware to handle errors
app.use(errorMiddlware);

module.exports = app;