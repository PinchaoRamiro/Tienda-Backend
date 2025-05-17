const { Category, Attribute } = require('../src/models');

async function createDefaultCategories() {
  try {
    // 1. Create Categories
    const clothing = await Category.create({ category_name: 'Clothing' });
    const electronics = await Category.create({ category_name: 'Electronics' });
    const furniture = await Category.create({ category_name: 'Furniture' });

    // 2. Create Attributes for Each Category
    await Attribute.bulkCreate([
      // Clothing
      { name: 'Size', category_id: clothing.category_id },
      { name: 'Color', category_id: clothing.category_id },
      { name: 'Material', category_id: clothing.category_id },

      // Electronics
      { name: 'Voltage', category_id: electronics.category_id },
      { name: 'Warranty', category_id: electronics.category_id },
      { name: 'Brand', category_id: electronics.category_id },

      // Furniture
      { name: 'Dimensions', category_id: furniture.category_id },
      { name: 'Material', category_id: furniture.category_id },
      { name: 'Wood Type', category_id: furniture.category_id }
    ]);

    console.log('✅ Categories and attributes created successfully');
  } catch (error) {
    console.error('❌ Error creating categories and attributes:', error);
  }
}

createDefaultCategories();
