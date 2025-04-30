const { connectDB, syncDB, User, Category, Product, Order, OrderItem } = require('../src/models/index.js');

const seedData = async () => {
  try {
    await connectDB();
    await syncDB(); // aseguramos que la estructura esté actualizada

    // console.log('🧹 Limpiando datos anteriores...');
    // await OrderItem.destroy({ where: {} });
    // await Order.destroy({ where: {} });
    // await Product.destroy({ where: {} });
    // await Category.destroy({ where: {} });
    // await User.destroy({ where: {} });

    console.log('✅ Insertando datos de prueba...');

    const category = await Category.create({
      category_name: 'Ropa'
    });

    const products = await Product.bulkCreate([
      {
        name: 'Camisa Roja',
        description: 'Camisa de algodón',
        price: 29.99,
        stock: 20,
        category_id: category.category_id
      },
      {
        name: 'Pantalón Azul',
        description: 'Jeans ajustados',
        price: 49.99,
        stock: 15,
        category_id: category.category_id
      }
    ]);

    const order = await Order.create({
      user_id: 20,
      total_amount: 109.97,
      status: 'Pagado'
    });

    await OrderItem.bulkCreate([
      {
        order_id: order.order_id,
        product_id: products[0].product_id,
        quantity: 2,
        price: 29.99
      },
      {
        order_id: order.order_id,
        product_id: products[1].product_id,
        quantity: 1,
        price: 49.99
      }
    ]);

    console.log('🎉 Datos insertados correctamente.');
    process.exit();
  } catch (err) {
    console.error('❌ Error al insertar datos:', err);
    process.exit(1);
  }
};

seedData();
