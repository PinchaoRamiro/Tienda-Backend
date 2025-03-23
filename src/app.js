const express = require('express');
const cors = require('cors');
//const { connectDB, syncDB } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    // await connectDB(); // this method conecct to the database

    // await syncDB(); // this method create the tables in the database


    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


