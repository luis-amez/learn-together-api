'use strict';

const express = require('express');
const router = express.Router();

const chirpController = require('../controllers/chirpController');
const authController = require('../controllers/authController');

router.post('/',
  authController.isLoggedIn,
  chirpController.newChirp
);

module.exports = router;
