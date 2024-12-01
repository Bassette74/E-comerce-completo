// ./routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../auth'); // Carregar os objetos do auth.js
const db = require('../models'); // Carregando o banco de dados

// Importar o serviço e o controlador
const CartService = require('../services/cartService');
const cartController = require('../controllers/CartController.js');

// Construir os objetos a partir das classes
const cartService = new CartService(db.Carrinho); // Isso não é necessário já que estamos instanciando no CartController

// Rota protegida para adicionar produto à cesta
router.post('/cart/add', auth.verifyToken, async (req, res) => {
    cartController.addProduct(req, res);
});

// Rota protegida para remover produto da cesta
router.delete('/cart/remove/:id', auth.verifyToken, async (req, res) => {
    cartController.removeProduct(req, res);
});

// Rota protegida para visualizar a cesta
router.get('/cart', auth.verifyToken, async (req, res) => {
    cartController.viewCart(req, res);
});

module.exports = router;
