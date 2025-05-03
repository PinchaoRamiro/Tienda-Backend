const { Product, Category, ProductAttribute, Attribute} = require('../models'); // Asegúrate de que la ruta sea correcta
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {

    const { name, description, price, stock, category_id, attributes } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ msg: 'Name, price and category are required' });
    }

    console.log('req.body', req.body);
    console.log('req.file', req.file);

    const image = req.file ? `/public/images/products/${req.file.filename}` : null;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category_id,
      image
    });

    // Atributos personalizados (si se envían)
    if (attributes && Array.isArray(attributes)) {
      for (const attr of attributes) {
        await ProductAttribute.create({
          product_id: product.product_id,
          attribute_id: attr.attribute_id,
          value: attr.value
        });
      }
    }

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
      include: [
        { model: Category, attributes: ['category_name'] },
        {
          model: ProductAttribute,
          include: [{ model: Attribute, attributes: ['name'] }]
        }
      ]
    });

    return res.json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

exports.getProductById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ msg: 'Product ID must be a number' });
  }

  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: Category, attributes: ['category_name'] },
        {
          model: ProductAttribute,
          include: [{ model: Attribute, attributes: ['name'] }]
        }
      ]
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

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found.' });

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

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found.' });

    await product.destroy(); // Esto también elimina los ProductAttributes si está bien relacionado

    return res.json({
      success: true,
      message: 'Product deleted successfully'
    });
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
          [Op.iLike]: `%${search}%`
        }
      },
      include: [{ 
        model: Category, attributes: ['category_name'],
        include: [Attribute]
       }]
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