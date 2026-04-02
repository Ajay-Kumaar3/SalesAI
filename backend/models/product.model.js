const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Product = sequelize.define('Product', {
  ProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allow_null: false,
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'General',
  },
  Description: DataTypes.TEXT,
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allow_null: false,
  },
  StockQuantity: {
    type: DataTypes.INTEGER,
    allow_null: false,
    defaultValue: 0,
  },
  ImageURL: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'products',
  timestamps: false,
});

module.exports = Product;
