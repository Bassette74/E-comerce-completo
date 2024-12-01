// ./controllers/productController.js
const productService = require('../services/produtoService');

class ProductController {
    async create(req, res) {
        const { Nome_Produto, Descricao_Produto, preco_Produto, estoque_Produto } = req.body;
        try {
            const product = await productService.create(Nome_Produto, Descricao_Produto, preco_Produto, estoque_Produto);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const products = await productService.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedProduct = await productService.update(id, data);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await productService.delete(id);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProductController();
