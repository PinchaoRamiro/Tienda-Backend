const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const { Op } = require('sequelize');

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

    return res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error', error: err });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['category_name'] }]
    });
    return res.json({
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

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: 'Product ID is required' });
  }else if (id !== parseInt(id, 10)) {
    return res.status(400).json({ msg: 'Product ID must be a number' });
  }

  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['category_name'] }]
    });
    if (!product) return res.status(404).json({ msg: 'Product not found.' });
    return res.json({
      success: true,
      data: product,
      message: 'Product fetched successfully'
    });
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
    return res.json({
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
    return res.json({
      success: true,
      message: 'Product disposed correctly' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const products = await Product.findAll({
      where: { category_id },
      include: [{ model: Category, attributes: ['category_name'] }]
    });

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this category'
      });
    }

    return res.json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

exports.getProductsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    if (!min || !max) {
      return res.status(400).json({ msg: 'Please provide both min and max price' });
    }

    const products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [parseFloat(min), parseFloat(max)]
        }
      },
      include: [{ model: Category, attributes: ['category_name'] }]
    });

    if (!products.length) {
      return res.status(404).json({ msg: ' Products not found ' });
    }

    return res.json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor', error: err });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    let search = q || req.body.search; // Usar el query string o el body

    if (!search || typeof search !== 'string') {
      return res.status(400).json({ msg: 'Pleace you need this' });
    }

    // Normalizar la cadena de búsqueda
    search = search.replace(/^%|%$/g, ''); // elimina % al principio y al final

    if (search.length === 0) {
      return res.status(400).json({ msg: 'this not be empty' });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%` // Mejor: insensible a mayúsculas/minúsculas en PostgreSQL
        }
      },
      include: [{ model: Category, attributes: ['category_name'] }]
    });

    if (products.length === 0) {
      return res.status(404).json({ msg: 'Not found' });
    }

    return res.json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    console.error(err);
    console.log('Error en la búsqueda de productos:', err);
    return res.status(500).json({ msg: 'Server Error', error: err });
  }
};