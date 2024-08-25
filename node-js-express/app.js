const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
require('./src/database/db_connection')();

const PORT = process.env.PORT || 5000;
const productRoutes = require('./src/routes/productRoutes');

const app = express();

app.use(express.json());


app.use('/api', productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });