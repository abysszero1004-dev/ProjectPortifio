const getAllProducts = async (req, res) => {
  const pool = req.app.get('db');
  try {
    const result = await pool.query('SELECT * FROM products');
    res.render('products', { products: result.rows });
  } catch (err) {
    res.status(500).send('Lỗi truy vấn sản phẩm');
  }
};

const getProductDetail = async (req, res) => {
  const pool = req.app.get('db');
  const productId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    if (result.rows.length === 0) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }
    res.render('product-detail', { product: result.rows[0] });
  } catch (err) {
    res.status(500).send('Lỗi truy vấn chi tiết sản phẩm');
  }
};

module.exports = {
  getAllProducts,
  getProductDetail,
};
