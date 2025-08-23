const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

module.exports = (pool) => {
  router.get('/login', authController.getLogin);
  router.post('/login', express.urlencoded({ extended: true }), authController.postLogin);
  router.get('/register', authController.getRegister);
  router.post('/register', express.urlencoded({ extended: true }), authController.postRegister);
  return router;
};
