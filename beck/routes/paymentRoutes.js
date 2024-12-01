// ./routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../auth'); // Middleware de autenticação
const db = require('../models'); // Carregando o banco de dados

// Importar o serviço e o controlador de pagamento
const PaymentService = require('../services/paymentService');
const paymentController = require('../controllers/paymentController');

// Construir o objeto a partir da classe PaymentService
const paymentService = new PaymentService(db.Transacao); // Supondo que o modelo seja Transacao

// Rota protegida para pagamento via cartão de crédito
router.post('/payment/credit-card', auth.verifyToken, async (req, res) => {
    paymentController.processarPagamentoCartao(req, res, paymentService);
});

// Rota protegida para pagamento via PIX
router.post('/payment/pix', auth.verifyToken, async (req, res) => {
    paymentController.processarPagamentoPix(req, res, paymentService);
});

// Rota protegida para consultar status da transação
router.get('/payment/status/:transactionId', auth.verifyToken, async (req, res) => {
    paymentController.consultarTransacao(req, res, paymentService);
});

module.exports = router;
