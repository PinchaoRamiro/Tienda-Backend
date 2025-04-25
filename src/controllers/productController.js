const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ msg: 'Name, price and category are required.' });
    }

    const category = await Category.findByPk(category_id);
    if (!category) return res.status(404).json({ msg: 'Category not found.' });

    const product = await Product.create({ name, description, price, stock, category_id });
    res.status(201).json(product);
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
    res.json(products);
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
    res.json({ msg: 'Updated Product', product });
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
    res.json({ msg: 'Product disposed correctly' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};
