const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

exports.getRevenueTrends = async (req, res) => {
  try {
    const data = await sequelize.query(
      `SELECT 
        DATE_FORMAT(orderdate, '%b') as month, 
        SUM(totalamount) as revenue 
       FROM orders 
       WHERE orderdate >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY month
       ORDER BY MIN(orderdate) ASC`,
      { type: QueryTypes.SELECT }
    );
    // Explicitly parse revenue as float for Recharts safety
    const formattedData = data.map(item => ({
      ...item,
      revenue: parseFloat(item.revenue || 0)
    }));
    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryDistribution = async (req, res) => {
  try {
    const data = await sequelize.query(
      `SELECT 
        p.category as name, 
        SUM(oi.quantity) as value 
       FROM order_items oi
       JOIN products p ON oi.productid = p.productid
       GROUP BY p.category`,
      { type: QueryTypes.SELECT }
    );
    // Explicitly parse value as number for Recharts safety
    const formattedData = data.map(item => ({
      ...item,
      value: parseInt(item.value || 0)
    }));
    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [totalRevenue] = await sequelize.query("SELECT SUM(totalamount) as total FROM orders", { type: QueryTypes.SELECT });
    const [totalProducts] = await sequelize.query("SELECT COUNT(*) as total FROM products", { type: QueryTypes.SELECT });
    const [totalOrders] = await sequelize.query("SELECT COUNT(*) as total FROM orders", { type: QueryTypes.SELECT });
    const [totalCustomers] = await sequelize.query("SELECT COUNT(*) as total FROM customers", { type: QueryTypes.SELECT });

    res.json({
      revenue: parseFloat(totalRevenue.total || 0),
      products: parseInt(totalProducts.total || 0),
      orders: parseInt(totalOrders.total || 0),
      customers: parseInt(totalCustomers.total || 0),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};