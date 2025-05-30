const { Category, Attribute } = require('../models'); // Importar el modelo de categoría

// Crear una categoría (solo admin)
exports.createCategory = async (req, res) => {
  try {

    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ msg: 'The category name is required' });
    }

    const exists = await Category.findOne({ where: { category_name } });
    if (exists) {
      return res.status(409).json({ msg: 'There is already a category with that name' });
    }

    const category = await Category.create({ category_name });
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
};

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        // Incluir atributos relacionados si es necesario
        { model: Attribute, attributes: ['name'] }
      ]
    });
    return res.json({
      success: true,
      data: categories,
      message: 'Categories fetched successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// Obtener categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Category not found' });
    res.json({
      success: true,
      data: category,
      message: 'Category fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// Actualizar categoría (solo admin)
exports.updateCategory = async (req, res) => {
  try {

    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Category not found' });

    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ msg: 'Name is required to update' });
    }

    await category.update({ category_name });
    res.json({
      success: true,
       message: 'Updated category', category

       });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// Eliminar categoría (solo admin)
exports.deleteCategory = async (req, res) => {
  try {

    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Category not found' });

    await category.destroy();
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// get category by name
exports.getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.findOne({ where: { category_name: name } });
    if (!category) return res.status(404).json({ msg: 'Category not found' });
    res.status(200).json({
      success: true,
      data: category,
      message: 'Category fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

