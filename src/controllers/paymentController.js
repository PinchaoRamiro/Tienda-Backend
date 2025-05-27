const { Payment, Order } = require('../models');

// POST /api/payments
exports.createPayment = async (req, res) => {
  try {
    const { order_id, payment_method, amount } = req.body;

    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    const payment = await Payment.create({
      order_id,
      payment_method,
      amount,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment registered successfully'
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// PATCH /api/payments/:id
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ msg: 'Payment not found' });

    payment.status = status;

    if (status === 'Paid') {
      payment.paid_at = new Date();

      // Optionally mark the order as Approved
      const order = await Order.findByPk(payment.order_id);
      if (order) await order.update({ status: 'Approved' });
    }

    await payment.save();

    res.json({
      success: true,
      data: payment,
      message: 'Payment status updated'
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// GET /api/orders/:orderId/payment
exports.getPaymentByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const payment = await Payment.findOne({
      where: { order_id: orderId }
    });

    if (!payment) return res.status(404).json({ msg: 'Payment not found for this order' });

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
