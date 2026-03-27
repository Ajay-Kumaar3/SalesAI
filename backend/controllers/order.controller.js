const { Order, OrderItem, Product, sequelize } = require('../models');

exports.findAll = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [OrderItem] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [OrderItem] });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { CustomerID, items } = req.body;

    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.Quantity * item.UnitPrice;
    }

    const order = await Order.create({ CustomerID, TotalAmount: totalAmount }, { transaction: t });

    for (const item of items) {
      await OrderItem.create({
        OrderID: order.OrderID,
        ProductID: item.ProductID,
        Quantity: item.Quantity,
        UnitPrice: item.UnitPrice
      }, { transaction: t });

      const product = await Product.findByPk(item.ProductID);
      if (product) {
        await product.update({ StockQuantity: product.StockQuantity - item.Quantity }, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    await t.rollback();
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
