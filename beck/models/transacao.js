// models/transacao.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Transacao = sequelize.define('Transacao', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valorTotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        metodoPagamento: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'pendente'  // Status inicial
        }
    });

    return Transacao;
};
