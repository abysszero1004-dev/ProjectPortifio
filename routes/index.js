const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

module.exports = (pool) => {
  router.get('/', (req, res) => indexController.getHome(req, res, pool));
  return router;
};
