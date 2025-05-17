'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Insert categories
    const categories = await queryInterface.bulkInsert('categories', [
      { category_name: 'Clothing', created_at: now },
      { category_name: 'Electronics', created_at: now },
      { category_name: 'Furniture', created_at: now }
    ], { returning: true });

    // 3. Insert attributes
    const attributes = await queryInterface.bulkInsert('attributes', [
      // Clothing
      { name: 'Size', category_id: clothingId },
      { name: 'Color', category_id: clothingId },
      { name: 'Material', category_id: clothingId },

      // Electronics
      { name: 'Voltage', category_id: electronicsId },
      { name: 'Warranty', category_id: electronicsId },
      { name: 'Brand', category_id: electronicsId },

      // Furniture
      { name: 'Dimensions', category_id: furnitureId },
      { name: 'Material', category_id: furnitureId },
      { name: 'Wood Type', category_id: furnitureId }
    ], { returning: true });

  },

  async down(queryInterface, Sequelize) {
  }
};
