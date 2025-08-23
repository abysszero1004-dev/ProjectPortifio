// controllers/indexController.js

exports.getHome = async (req, res, pool) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.render('index', { users: result.rows });
  } catch (err) {
    res.status(500).send('Database error');
  }
};
