const express = require('express')
require ('dotenv').config();
const cors = require('cors')
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes')
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser')

connectDB();

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}));

const port = process.env.PORT || 5000;

app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Server mein kuch fatt gaya!" });
});

app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
