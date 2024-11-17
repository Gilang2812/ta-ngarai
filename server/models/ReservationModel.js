const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  package_id: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  request_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  check_in: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total_people: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  deposit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  proof_of_deposit: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  admin_deposit_check: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  token_of_deposit: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  deposit_check: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  deposit_channel: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  deposit_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  proof_of_payment: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  admin_payment_check: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  token_of_payment: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  payment_check: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  payment_channel: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  confirmation_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  admin_confirm: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancel: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  cancel_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  account_refund: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  proof_refund: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  refund_amount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  refund_check: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  refund_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  admin_refund: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  type_of_payment: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 2
  }
}, {
  tableName: 'reservation',  
  timestamps: false
});

module.exports = {Reservation};
