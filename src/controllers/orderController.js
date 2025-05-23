const {  Product, Order, OrderItem} = require('../models/index');

// Create a order (client)
exports.createOrder = async (req, res) => {
  try {
    const { items, total_amount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: 'The order must contain at least one product' });
    }

    const order = await Order.create({
      user_id: req.user.id,
      total_amount
    });

    //create associated items
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return res.status(404).json({ msg: `Product ID ${item.product_id} not found` });
      }

      await OrderItem.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });
    }

    res.status(201).json({ msg: 'Order created successfully', order_id: order.order_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err });
  }
};

// get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: OrderItem });
    res.json({
      success: true,
      data: orders,
      message: 'Orders fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// get orders of user autenticated
exports.getMyOrders = async (req, res) => { 
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });
    res.json({
      success: true,
      data: orders,
      message: 'Orders fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

//  Get order by ID (admin o owner)
exports.getOrderById = async (req, res) => {


  const id = req.params.id;
  if (!id) return res.status(400).json({ msg: 'Order ID is required' });

  
  const userId = req.user.id;

  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    if (req.user.role !== 'admin' && order.user_id !== userId) {
      return res.status(403).json({ msg: 'You do not have permission to view this order.' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// chage order status (solo admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    await order.update({ status });
    res.json({ msg: 'Updated status', order });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};
