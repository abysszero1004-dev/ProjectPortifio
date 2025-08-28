const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'project',
  password: process.env.DB_PASS || '1',
  port: process.env.DB_PORT || 5432,
});



// Import routes
const indexRoute = require('./routes/index')(pool);
const authRoute = require('./routes/auth')(pool);

app.use('/', indexRoute);
app.use('/', authRoute);

// Import and use productRoute after pool is initialized
const productRoute = require('./routes/product')(pool);
app.use('/', productRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
