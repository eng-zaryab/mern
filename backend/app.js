const express = require('express');
const errorMiddlware = require('./middlewares/errors');

const app = express();
app.use(express.json());

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products);
app.use('/api/v1', auth);

// Middlware to handle errors
app.use(errorMiddlware);

module.exports = app;