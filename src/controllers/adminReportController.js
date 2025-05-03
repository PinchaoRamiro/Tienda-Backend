const { User, Product, Order } = require('../models');
const { Sequelize } = require('sequelize');

// Informe general
exports.getDashboardSummary = async (req, res) => {
  try {

    const [totalUsers, totalProducts, totalOrders, totalIncome] = await Promise.all([
      User.count(),
      Product.count(),
      Order.count(),
      Order.sum('total_amount')
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalIncome
      },
      message: 'Dashboard summary fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor', error: err });
  }
};

// Productos sin stock
exports.getOutOfStockProducts = async (req, res) => {
  try {

    const products = await Product.findAll({ where: { stock: 0 } });

    return res.json({
      success: true,
      data: products,
      message: 'Out of stock products fetched successfully'
    });
  } catch (err) {
    return res.status(500).json({ msg: 'Error en el servidor', error: err });
  }
};

// Órdenes agrupadas por estado
exports.getOrdersByStatus = async (req, res) => {
  try {

    const orders = await Order.findAll({
      attributes: [
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
      ],
      group: ['status']
    });

    return res.json({
      succsess: true,
      data: orders,
      message: 'Orders by status fetched successfully'
    });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err });
  }
};
