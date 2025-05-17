const { Attribute, Category } = require('../models');
const { Product, ProductAttribute } = require('../models');

// 👮‍♂️ Crear atributo (solo admin)
exports.createAttribute = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only admins can create attributes' });
    }

    const { name, category_id } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ msg: 'Name and category_id are required' });
    }

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    const attribute = await Attribute.create({ name, category_id });

    return res.status(201).json({
      success: true,
      data: attribute,
      message: 'Attribute created successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// 📥 Obtener todos los atributos de una categoría
exports.getAttributesByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const attributes = await Attribute.findAll({
      where: { category_id }
    });

    res.json({
      success: true,
      data: attributes,
      message: 'Attributes fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

exports.updateProductWithAttributes = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      stock,
      category_id,
      attributes 
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: 'Product not found.' });

    // 🔄 Actualizar campos básicos del producto
    await product.update({ name, price, description, stock, category_id });

    // 🧼 Si hay atributos, reemplazar todos
    if (attributes && Array.isArray(attributes)) {
      await ProductAttribute.destroy({ where: { product_id: id } });

      // Crear nuevos
      for (const attr of attributes) {
        await ProductAttribute.create({
          product_id: id,
          attribute_id: attr.attribute_id,
          value: attr.value
        });
      }
    }

    return res.json({
      success: true,
      data: product,
      message: 'Product and attributes updated successfully'
    });

  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};
