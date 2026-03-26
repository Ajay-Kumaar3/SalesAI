const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const OrderItem = sequelize.define('OrderItem', {
  OrderItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  OrderID: {
    type: DataTypes.INTEGER,
    allow_null: false,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allow_null: false,
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allow_null: false,
  },
  UnitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allow_null: false,
  },
}, {
  tableName: 'Order_Items',
  timestamps: false,
});

module.exports = OrderItem;
