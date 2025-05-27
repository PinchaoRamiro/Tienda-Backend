const { Product, Category, ProductAttribute, Attribute} = require('../models'); // Asegúrate de que la ruta sea correcta
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {

    const { name, description, price, stock, category_id, attributes } = req.body;

    console.log('req.body', req.body);
    console.log('req.file', req.file);

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

// createt a product Clothing
// {
            // "category_id": 17,
            // "name": "Jeans",
            // "description": "Black slim jeans",
            // "price": "39.99",
            // "stock": 15,
            // "image": null,
            // "created_at": "2025-05-16T09:42:39.782Z",
            // "Size": "L",
            // "Color": "Black",
            // "Material": "Denim"
//         }

exports.createProductClothing = async (req, res) => {
  try {
    const { category_id, name, description, price, stock, image, Size, Color, Material } = req.body;
    console.log('req.body', req.body);

    if (!name || !price || !category_id) {
      return res.status(400).json({ msg: 'Name, price and category are required' });
    }
    const product = await Product.create({
      category_id,
      name,
      description,
      price,
      stock,
      image
    });
    console.log('product', product);
    // Atributos personalizados (si se envían)
    if (Size) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 37, // ID del atributo "Size"
        value: Size
      });
    }
    if (Color) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 38, // ID del atributo "Color"
        value: Color
      });
    }
    if (Material) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 39, // ID del atributo "Material"
        value: Material
      });
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
}

exports.createProductElectronics = async (req, res) => {
  try {
    const { category_id, name, description, price, stock, image, Brand, Warranty, Voltage } = req.body;
    console.log('req.body', req.body);
    console.log('req.file', req.file);
    if (!name || !price || !category_id) {
      return res.status(400).json({ msg: 'Name, price and category are required' });  
    }
    const product = await Product.create({
      category_id,
      name,
      description,
      price,
      stock,
      image
    });
    console.log('product', product);
    // Atributos personalizados (si se envían)
    if (Brand) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 42, // ID del atributo "Brand"
        value: Brand
      });

    }
    if (Warranty) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 41, // ID del atributo "Warranty"
        value: Warranty
      });
    }
    if (Voltage) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 40, // ID del atributo "Voltage"
        value: Voltage
      });
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
}

exports.createProductFurniture = async (req, res) => {
  try {
    const { category_id, name, description, price, stock, image, Dimensions, Material, woodType } = req.body;
    console.log('req.body', req.body);
    console.log('req.file', req.file);

    if (!name || !price || !category_id) {
      return res.status(400).json({ msg: 'Name, price and category are required' });
    }
    const product = await Product.create({
      category_id,
      name,
      description,
      price,
      stock,
      image
    });
    console.log('product', product);

    // Atributos personalizados (si se envían)
    if (Dimensions) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 43, // ID del atributo "Dimensions"
        value: Dimensions
      });
    }

    if (Material) {
      await ProductAttribute.create({
        
        product_id: product.product_id,
        attribute_id: 44, // ID del atributo "Material"
        value: Material
      });
    }
    if (woodType) {
      await ProductAttribute.create({
        product_id: product.product_id,
        attribute_id: 45, // ID del atributo "Woodtype"
        value: woodType
    })
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
}


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['category_name'] },
        {
          model: ProductAttribute,
          attributes: ['value'],
          include: [
            { model: Attribute, attributes: ['name'] }
          ]
        }
      ]
    });

    // Transform response
    const formatted = products.map(product => {
      const prod = {
        product_id: product.product_id,
        category_id: product.category_id,
        Category: product.Category|| null,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        created_at: product.created_at
      };

      // Add each custom attribute as a key
      product.ProductAttributes.forEach(attr => {
        const attrName = attr.Attribute?.name;
        if (attrName) {
          prod[attrName] = attr.value;
        }
      });

      return prod;
    });

    return res.json({
      success: true,
      data: formatted,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  console.log('getProductById id', id);
  if (!id) {
    return res.status(400).json({ msg: 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: ProductAttribute,
          attributes: ['value'],
          include: [
            {
              model: Attribute,
              attributes: ['name']
            }
          ]
        }
      ]
    });

    console.log('product', product);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
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

    console.log(search);

    if (search.length === 0) {
      return res.status(400).json({ msg: 'this not be empty' });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`
        }
      },
      include: [ 
        { model: Category, attributes: ['category_name'] },
        {
          model: ProductAttribute,
          include: [{ model: Attribute, attributes: ['name'] }]
        }
      ]
    });

    if (products.length === 0) {
      return res.status(404).json({ msg: 'Not found' });
    }

        // Transform response
    const formatted = products.map(product => {
      const prod = {
        product_id: product.product_id,
        category_id: product.category_id,
        Category: product.Category?.category_name || null,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        created_at: product.created_at
      };

      // Add each custom attribute as a key
      product.ProductAttributes.forEach(attr => {
        const attrName = attr.Attribute?.name;
        if (attrName) {
          prod[attrName] = attr.value;
        }
      });

      return prod;
    });

    return res.json({
      success: true,
      data: formatted,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    return res.status(500).json({ msg: 'Server Error', error: err });
  }
};