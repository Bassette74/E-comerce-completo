// ./controllers/CartController.js
const CartService = require('../services/cartService'); // Corrigido para importar a classe

class CartController {
    constructor() {
        this.cartService = new CartService(); // Instanciar o serviço aqui
    }

    // Adiciona um produto à cesta
    async addProduct(req, res) {
        const { userId, productId, quantity } = req.body;
        try {
            const cart = await this.cartService.criarCarrinho(userId, { productId, quantity }, 0); // Ajustado para usar o método correto
            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Remove um produto da cesta
    async removeProduct(req, res) {
        const { id } = req.params; // ID do item na cesta
        const { userId } = req.body;
        try {
            const result = await this.cartService.removerCarrinho(userId); // Corrigido para usar o método correto
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Produto não encontrado na cesta' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Visualiza os itens na cesta
    async viewCart(req, res) {
        const { userId } = req.body;
        try {
            const cart = await this.cartService.buscarCarrinhoPorUsuario(userId); // Corrigido para usar o método correto
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CartController(); // Exportando a instância da classe
