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
  database: process.env.DB_NAME || 'shoponline',
  password: process.env.DB_PASS || 'yourpassword',
  port: process.env.DB_PORT || 5432,
});


// Trang chủ
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.render('index', { users: result.rows });
  } catch (err) {
    res.status(500).send('Database error');
  }
});

// Trang đăng nhập
app.get('/login', (req, res) => {
  res.render('login');
});

// Xử lý đăng nhập (demo, chưa xác thực thực tế)
app.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
  const { username, password } = req.body;
  // TODO: Thêm xác thực thực tế
  res.send(`Đăng nhập với user: ${username}`);
});

// Trang đăng ký
app.get('/register', (req, res) => {
  res.render('register');
});

// Xử lý đăng ký (demo, chưa lưu vào DB)
app.post('/register', express.urlencoded({ extended: true }), async (req, res) => {
  const { username, email, password } = req.body;
  // TODO: Thêm lưu user vào DB
  res.send(`Đăng ký user: ${username}, email: ${email}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
