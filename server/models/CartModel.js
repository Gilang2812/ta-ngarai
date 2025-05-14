const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { generateCustomId } = require('../utils/generateId');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        allowNull: false
    },
    package_id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
     
    },
    status: {
        type: DataTypes.TINYINT ,
        allowNull: false,
        defaultValue: 0,
     
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: 'cart',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Cart.beforeCreate(async(instance)=>{
    instance.id =await generateCustomId('C',Cart,5)

})

module.exports = {Cart};
