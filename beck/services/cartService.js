// ./services/cartService.js

const { Carrinho } = require('../models');  // Importa o modelo Carrinho a partir do index.js dos models

class CartService {
    async criarCarrinho(userId, items, totalPrice) {
        try {
            // Cria um novo carrinho
            const carrinho = await Carrinho.create({
                userId,
                items,
                totalPrice
            });
            return carrinho;
        } catch (error) {
            console.error("Erro ao criar carrinho:", error);
            throw error;
        }
    }

    async buscarCarrinhoPorUsuario(userId) {
        try {
            // Busca um carrinho por ID do usuário
            const carrinho = await Carrinho.findOne({
                where: { userId }
            });
            return carrinho;
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
            throw error;
        }
    }

    async atualizarCarrinho(userId, items, totalPrice) {
        try {
            // Atualiza os itens e o preço total de um carrinho existente
            const carrinho = await Carrinho.update(
                { items, totalPrice },
                { where: { userId } }
            );
            return carrinho;
        } catch (error) {
            console.error("Erro ao atualizar carrinho:", error);
            throw error;
        }
    }

    async removerCarrinho(userId) {
        try {
            // Remove o carrinho de um usuário
            const resultado = await Carrinho.destroy({
                where: { userId }
            });
            return resultado;
        } catch (error) {
            console.error("Erro ao remover carrinho:", error);
            throw error;
        }
    }
}

module.exports = CartService; // Corrigido para exportar a classe
