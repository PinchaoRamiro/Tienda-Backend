const {  Product, Order, OrderItem, Payment} = require('../models');

// Create a order (client)
exports.createOrder = async (req, res) => {
  try {
    const user_id = req.user.id; // Viene del middleware auth
    const { total_amount, orderItems: order_items, shipping_address, payment_method } = req.body;

    console.log('Creating order for user:', user_id);
    console.log('Order details:', { total_amount, order_items, shipping_address, payment_method });

    if (!order_items || !Array.isArray(order_items) || order_items.length === 0) {
      return res.status(400).json({ msg: 'Order must include at least one product' });
    }
    // Crear orden
    const order = await Order.create({
      user_id,
      total_amount: total_amount.toFixed(2),
      status: 'Pending',
      shipping_address
    });

    // Crear items
    for (const item of order_items) {
      await OrderItem.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price 
      });

      // Opcional: reducir stock
      const product = await Product.findByPk(item.product_id);
      await product.decrement('stock', { by: item.quantity });
    }

    // Crear pago (simulado)
    const payment = await Payment.create({
      order_id: order.order_id,
      payment_method,
      amount: total_amount.toFixed(2),
      status: 'Pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order,
        payment
      }
    });
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

// get orders by user ID (admin)
exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) return res.status(400).json({ msg: 'User ID is required' });

  try {
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    if (orders.length === 0) {
      return res.status(404).json({ msg: 'No orders found for this user' });
    }

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
          model: OrderItem
        }
      ]
    });

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found for this user' });
    }

    console.log('Orders for user:', req.user.id);
    console.log('Orders data:', orders);

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
