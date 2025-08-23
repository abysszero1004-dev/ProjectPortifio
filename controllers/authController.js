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

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  // TODO: Thêm lưu user vào DB
  res.send(`Đăng ký user: ${username}, email: ${email}`);
};
