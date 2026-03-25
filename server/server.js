const express = require('express')
require ('dotenv').config();
const cors = require('cors')
const recipeRoutes = require('./routes/recipeRoutes');
const connectDB = require('./config/db');

connectDB();

const app = express()

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
