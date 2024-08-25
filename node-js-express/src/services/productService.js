const Product = require('../models/product');

class ProductService {
    async createProduct(data) {
        const product = new Product(data);
        return await product.save();
    }

    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async updateProduct(productId, data) {
        return await Product.findByIdAndUpdate(productId, data, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = new ProductService();
