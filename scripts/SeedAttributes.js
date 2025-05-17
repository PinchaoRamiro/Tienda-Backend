const { sequelize, ProductAttribute } = require('../src/models');

async function insertProductAttributes() {
  try {

    const attributes = [
      // 👕 Clothing
      { product_id: 60, attribute_id: 37, value: 'M' },
      { product_id: 60, attribute_id: 38, value: 'Blue' },
      { product_id: 60, attribute_id: 39, value: 'Cotton' },

      { product_id: 61, attribute_id: 37, value: 'L' },
      { product_id: 61, attribute_id: 38, value: 'Black' },
      { product_id: 61, attribute_id: 39, value: 'Denim' },

      { product_id: 62, attribute_id: 37, value: 'XL' },
      { product_id: 62, attribute_id: 38, value: 'Gray' },
      { product_id: 62, attribute_id: 39, value: 'Nylon' },

      // 🔌 Electronics
      { product_id: 63, attribute_id: 40, value: '5V' },
      { product_id: 63, attribute_id: 41, value: '2 years' },
      { product_id: 63, attribute_id: 42, value: 'TechBrand' },

      { product_id: 64, attribute_id: 40, value: '3.7V' },
      { product_id: 64, attribute_id: 41, value: '1 year' },
      { product_id: 64, attribute_id: 42, value: 'SoundX' },

      { product_id: 65, attribute_id: 40, value: '19V' },
      { product_id: 65, attribute_id: 41, value: '2 years' },
      { product_id: 65, attribute_id: 42, value: 'ProTech' },

      // 🪑 Furniture
      { product_id: 66, attribute_id: 43, value: '120x60x45 cm' },
      { product_id: 66, attribute_id: 44, value: 'Oak' },
      { product_id: 66, attribute_id: 45, value: 'Solid Wood' },

      { product_id: 67, attribute_id: 43, value: '180x60x30 cm' },
      { product_id: 67, attribute_id: 44, value: 'MDF' },
      { product_id: 67, attribute_id: 45, value: 'Walnut Veneer' },

      { product_id: 68, attribute_id: 43, value: 'Adjustable' },
      { product_id: 68, attribute_id: 44, value: 'Mesh' },
      { product_id: 68, attribute_id: 45, value: 'Plastic Base' }
    ];

    await ProductAttribute.bulkCreate(attributes);

    console.log('✅ Product attributes inserted successfully.');
  } catch (error) {
    console.error('❌ Error inserting product attributes:', error);
  }
}

insertProductAttributes();
