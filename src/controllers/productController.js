const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only admins can create products' });
    }

    const { name, description, price, stock, category_id } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ msg: 'Name, price and category be required' });
    }

    const image = req.file ? `/public/images/products/${req.file.filename}` : null;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category_id,
      image
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['category_name'] }]
    });
    res.json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['category_name'] }]
    });
    if (!product) return res.status(404).json({ msg: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

//  (only admin)
exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto not found.' });

    await product.update(req.body);
    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// (soft delete opcional)
exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto not found.' });

    await product.destroy();
    res.json({
      success: true,
      message: 'Product disposed correctly' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};
