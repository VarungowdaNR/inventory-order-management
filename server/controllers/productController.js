const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category } = req.body;
    const p = new Product({ name, price, stock, category });
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};
