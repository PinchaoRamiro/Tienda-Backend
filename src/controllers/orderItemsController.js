const { OrderItem, Product, Order } = require('../models');

exports.createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;

    // Verificar si el producto y el pedido existen
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Calcular el precio total para ese OrderItem
    const price = product.price;

    // Crear el OrderItem
    const orderItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
      price,
    });

    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating OrderItem.' });
  }
};

exports.getOrderItems = async (req, res) => {
  try {
    const { order_id } = req.params;

    const orderItems = await OrderItem.findAll({
      where: { order_id },
      include: [
        {
          model: Product,
          attributes: ['name', 'price', 'category_id'], // Can add more
        },
      ],
    });

    if (orderItems.length === 0) {
      return res.status(404).json({ message: 'There are no products in this order.' });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting OrderItems.' });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const { order_item_id } = req.params;
    const { quantity } = req.body;

    const orderItem = await OrderItem.findByPk(order_item_id);

    if (!orderItem) {
      return res.status(404).json({ message: 'OrderItem not found.' });
    }

    // Verificar si la cantidad es válida y actualiza el OrderItem
    if (quantity <= 0) {
      return res.status(400).json({ message: 'The amount must be greater than zero.' });
    }

    orderItem.quantity = quantity;

    // Recalcular el precio según la cantidad y el precio unitario del producto
    const product = await Product.findByPk(orderItem.product_id);
    orderItem.price = product.price * quantity;

    await orderItem.save();

    res.status(200).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating OrderItem.' });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const { order_item_id } = req.params;

    const orderItem = await OrderItem.findByPk(order_item_id);

    if (!orderItem) {
      return res.status(404).json({ message: 'OrderItem not found.' });
    }

    await orderItem.destroy();

    res.status(200).json({ message: 'OrderItem successfully deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting OrderItem.' });
  }
};
