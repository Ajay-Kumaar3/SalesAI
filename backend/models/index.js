const sequelize = require('../config/db.config');
const Customer = require('./customer.model');
const Product = require('./product.model');
const Order = require('./order.model');
const OrderItem = require('./orderItem.model');
const AuditLog = require('./auditLog.model');
const User = require('./user.model');

Customer.hasMany(Order, { foreignKey: 'CustomerID' });
Order.belongsTo(Customer, { foreignKey: 'CustomerID' });

Order.hasMany(OrderItem, { foreignKey: 'OrderID' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderID' });

Product.hasMany(OrderItem, { foreignKey: 'ProductID' });
OrderItem.belongsTo(Product, { foreignKey: 'ProductID' });

module.exports = {
  Customer,
  Product,
  Order,
  OrderItem,
  AuditLog,
  User,
  sequelize,
};
