const express = require('express');
const cors = require('cors');
const path = require('path');
// const { connectDB, syncDB } = require('./models');
// const { connectDB, syncDB } = require('./config/db_remote');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminReportRoutes = require('./routes/adminReportRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); 

require('dotenv').config();

const app = express();

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/admin/report', adminReportRoutes);
app.use('/api/payment', paymentRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {

    // await connectDB(); // this method conecct to the database

    // await syncDB(); // this method create the tables in the database

    console.log(`Server runing in http://localhost:${PORT}`);
});


