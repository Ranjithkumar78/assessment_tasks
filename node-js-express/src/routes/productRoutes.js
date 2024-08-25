const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const validateProduct = require('../middlewares/validationMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Create a new product
router.post('/products', upload, validateProduct, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const product = await productService.createProduct({ name, price, description, imageUrl });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product by ID
router.put('/products/:id', upload, validateProduct, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const product = await productService.updateProduct(req.params.id, { name, price, description, imageUrl });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(500).json('Product Deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
