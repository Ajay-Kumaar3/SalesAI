const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Order = sequelize.define('Order', {
  OrderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CustomerID: {
    type: DataTypes.INTEGER,
    allow_null: false,
  },
  OrderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  TotalAmount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.00,
  },
}, {
  tableName: 'Orders',
  timestamps: false,
});

module.exports = Order;
