'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/me', authController.me);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);

module.exports = router;
