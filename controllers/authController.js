// controllers/authController.js


exports.getLogin = (req, res) => {
  res.render('login', { message: null });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      // Đăng nhập thành công, chuyển hướng về trang chủ
      return res.redirect('/');
    } else {
      // Sai thông tin, render lại trang login với thông báo
      return res.render('login', { message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi đăng nhập!');
  }
};

exports.getRegister = (req, res) => {
  res.render('register', { message: null, showLogin: false });
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
      return res.render('register', { message: 'Tên đăng nhập hoặc email đã tồn tại!', showLogin: false });
    }
    // Thêm user mới
    await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);
    // Đăng ký thành công, render lại với thông báo và nút đăng nhập ngay
    res.render('register', { message: 'Đăng ký thành công!', showLogin: true });
  } catch (err) {
    console.error(err);
    res.status(500).render('register', { message: 'Lỗi đăng ký!', showLogin: false });
  }
};
