// ./services/userService.js
const auth = require('../auth');
const bcrypt = require('bcrypt');
var round_salts = 10;
const db = require('../models');

const Product = require('../models/produto');
class ProductService {
    async create(nome, descricao, preco, estoque) {
        try {
            const newProduct = await Product.create({ nome, descricao, preco, estoque });
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await Product.findAll();
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const product = await Product.findByPk(id);
            if (!product) throw new Error('Produto não encontrado');
            await product.update(data);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await Product.destroy({ where: { id } });
            return result > 0;
        } catch (error) {
            throw error;
        }
    }
}

// Exporte a classe, não uma instância
module.exports = ProductService; 
