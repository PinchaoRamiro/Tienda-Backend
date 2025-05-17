const { Product, Category } = require('../src/models');

async function createSampleProducts() {
  try {
    // 1. Fetch category IDs
    const clothing = await Category.findOne({ where: { category_name: 'Clothing' } });
    const electronics = await Category.findOne({ where: { category_name: 'Electronics' } });
    const furniture = await Category.findOne({ where: { category_name: 'Furniture' } });

    if (!clothing || !electronics || !furniture) {
      return console.error('❌ Missing one or more categories. Please run category creation first.');
    }

    // 2. Insert sample products
    await Product.bulkCreate([
      // 👕 Clothing
      {
        name: 'Blue T-Shirt',
        description: 'Comfortable cotton t-shirt in blue.',
        price: 19.99,
        stock: 50,
        category_id: clothing.category_id,
        image: null
      },
      {
        name: 'Black Jeans',
        description: 'Slim fit black jeans, durable and stylish.',
        price: 39.99,
        stock: 30,
        category_id: clothing.category_id,
        image: null
      },
      {
        name: 'Winter Jacket',
        description: 'Insulated jacket perfect for cold seasons.',
        price: 89.99,
        stock: 20,
        category_id: clothing.category_id,
        image: null
      },

      // 🔌 Electronics
      {
        name: 'Smartphone X200',
        description: 'Latest smartphone with OLED screen and 128GB storage.',
        price: 699.99,
        stock: 15,
        category_id: electronics.category_id,
        image: null
      },
      {
        name: 'Bluetooth Headphones',
        description: 'Wireless headphones with noise cancellation.',
        price: 129.99,
        stock: 25,
        category_id: electronics.category_id,
        image: null
      },
      {
        name: 'Laptop Pro 15"',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
        price: 1299.99,
        stock: 10,
        category_id: electronics.category_id,
        image: null
      },

      // 🪑 Furniture
      {
        name: 'Wooden Coffee Table',
        description: 'Classic oak coffee table, handmade.',
        price: 149.99,
        stock: 8,
        category_id: furniture.category_id,
        image: null
      },
      {
        name: 'Bookshelf',
        description: '5-tier wooden bookshelf, dark walnut finish.',
        price: 89.99,
        stock: 12,
        category_id: furniture.category_id,
        image: null
      },
      {
        name: 'Office Chair',
        description: 'Ergonomic office chair with lumbar support.',
        price: 119.99,
        stock: 18,
        category_id: furniture.category_id,
        image: null
      }
    ]);

    console.log('✅ Sample products created successfully');
  } catch (error) {
    console.error('❌ Error creating products:', error);
  }
}

createSampleProducts();
