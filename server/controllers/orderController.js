const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.productId', 'name price');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Order must have items' });
    }

    let totalAmount = 0;
    const updatedProducts = []; 

    for (const it of items) {
      const { productId, qty } = it;
      if (!productId || !qty || qty <= 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Invalid item in order' });
      }

      const updated = await Product.findOneAndUpdate(
        { _id: productId, stock: { $gte: qty } },
        { $inc: { stock: -qty } },
        { new: true, session }
      );

      if (!updated) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: `Insufficient stock for product ${productId}` });
      }

      updatedProducts.push({ productId, qty });
      totalAmount += updated.price * qty;
    }

    const order = new Order({ items, totalAmount, status: 'Pending' });
    const savedOrder = await order.save({ session });
    await session.commitTransaction();
    session.endSession();

    const populated = await savedOrder.populate('items.productId', 'name price');
    res.status(201).json(populated);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};
