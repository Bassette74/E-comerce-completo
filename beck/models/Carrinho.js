const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Carrinho = sequelize.define('Carrinho', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        items: {
            type: Sequelize.JSON,  // Aqui substituímos JSONB por JSON
            allowNull: false
        },
        totalPrice: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });

    return Carrinho;
};
