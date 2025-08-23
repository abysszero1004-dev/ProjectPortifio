// controllers/authController.js

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  // TODO: Thêm xác thực thực tế
  res.send(`Đăng nhập với user: ${username}`);
};

exports.getRegister = (req, res) => {
  res.render('register');
};

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'project',
  password: process.env.DB_PASS || '1',
  port: process.env.DB_PORT || 5432,
});

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Kiểm tra username/email đã tồn tại chưa
    const check = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (check.rows.length > 0) {
      return res.send('Tên đăng nhập hoặc email đã tồn tại!');
    }
    // Thêm user mới
    await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);
    res.send('Đăng ký thành công!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi đăng ký!');
  }
};
