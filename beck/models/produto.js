// model/produto.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Produto = sequelize.define('Produto', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        descricao: {
            type: Sequelize.TEXT, // Pode ser TEXT ou STRING dependendo do tamanho esperado
            allowNull: true
        },
        preco: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        estoque: {
            type: Sequelize.INTEGER, 
        }
    });

    return Produto; // Certifique-se de que essa linha está correta
};
