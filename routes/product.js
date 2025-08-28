const express = require('express');
const { getAllProducts, getProductDetail } = require('../controllers/productController');
const router = express.Router();

module.exports = (pool) => {
  // Gắn pool vào req để controller có thể truy cập
  router.use((req, res, next) => {
    req.app.set('db', pool);
    next();
  });

  router.get('/products', getAllProducts);
  router.get('/products/:id', getProductDetail);
  return router;
};
