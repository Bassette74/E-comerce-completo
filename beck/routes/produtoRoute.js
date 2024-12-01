// ./routes/productRoutes.js
var express = require('express');
var router = express.Router();
const auth = require('../auth'); // Carregar os objetos do auth.js
const db = require('../models'); // Carregando o banco de dados

// Importar o serviço e o controlador
const ProdutoService = require('../services/produtoService');
const productController = require('../controllers/productController'); // Ajuste aqui

// Construir os objetos a partir das classes
const produtoService = new ProdutoService(db.Produto);

// Rotas protegidas
router.post('/novoproduto', auth.verifyToken, async (req, res) => {
    produtoController.create(req, res);
});

router.get('/listproduto', auth.verifyToken, async (req, res) => {
    produtoController.findAll(req, res);
});

router.put('/updateproduto/:id', auth.verifyToken, async (req, res) => {
    produtoController.update(req, res);
});

router.delete('/deleteproduto/:id', auth.verifyToken, async (req, res) => {
    produtoController.delete(req, res);
});

module.exports = router;
