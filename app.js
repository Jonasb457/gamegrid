const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Database connection
db.connect()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed', err));

module.exports = app;
