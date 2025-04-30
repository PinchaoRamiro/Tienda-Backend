
const { connectDB, syncDB, User, Product, Category, Order, OrderItem } = require('../src/models/index');
const { Sequelize } = require('sequelize');

const testCascadeDelete = async () => {
  try {
    await connectDB();
    await syncDB(); // asegura estructura actualizada

    console.log('🔁 Limpieza previa...');
    await OrderItem.destroy({ where: {} });
    await Order.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log('✅ Creando datos de prueba...');

    const user = await User.create({ name: 'Admin', lastname: 'Test', email: 'admin@test.com', password: '123456' });
    const category = await Category.create({ category_name: 'Ropa' });
    const product1 = await Product.create({ name: 'Camisa Roja', price: 29.99, stock: 10, category_id: category.category_id });
    const product2 = await Product.create({ name: 'Pantalón Azul', price: 49.99, stock: 5, category_id: category.category_id });

    const order = await Order.create({ user_id: user.id, total_amount: 109.97 });
    await OrderItem.bulkCreate([
      { order_id: order.order_id, product_id: product1.product_id, quantity: 2, price: 29.99 },
      { order_id: order.order_id, product_id: product2.product_id, quantity: 1, price: 49.99 }
    ]);

    console.log('🧪 Prueba: eliminando orden...');
    await order.destroy();

    const remainingItems = await OrderItem.findAll({ where: { order_id: order.order_id } });

    if (remainingItems.length === 0) {
      console.log('✅ Éxito: Los OrderItems fueron eliminados automáticamente.');
    } else {
      console.log('❌ Falla: Los OrderItems NO fueron eliminados.');
    }

    console.log('🧪 Prueba: eliminando producto...');
    await product1.destroy();
    const itemsForDeletedProduct = await OrderItem.findAll({ where: { product_id: product1.product_id } });

    if (itemsForDeletedProduct.length === 0) {
      console.log('✅ Éxito: Los OrderItems del producto fueron eliminados.');
    } else {
      console.log('❌ Falla: Los OrderItems del producto NO fueron eliminados.');
    }

    console.log('🧪 Prueba: eliminando categoría...');
    await category.destroy();
    const productStillThere = await Product.findAll({ where: { category_id: category.category_id } });

    if (productStillThere.length === 0) {
      console.log('✅ Productos eliminados o desvinculados correctamente.');
    } else {
      console.log('⚠️ Productos siguen existiendo pero sin categoría (SET NULL).');
    }

    console.log('🎉 Prueba completada.');
  } catch (err) {
    console.error('❌ Error durante la prueba:', err);
  }
};

testCascadeDelete();
