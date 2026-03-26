const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Customer = sequelize.define('Customer', {
  CustomerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allow_null: false,
  },
  Email: {
    type: DataTypes.STRING,
    allow_null: false,
    unique: true,
  },
  Phone: DataTypes.STRING,
  Address: DataTypes.TEXT,
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Customers',
  timestamps: false,
});

module.exports = Customer;
