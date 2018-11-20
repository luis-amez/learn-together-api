'use strict';

const express = require('express');
const router = express.Router();

const chirpController = require('../controllers/chirpController');
const authController = require('../controllers/authController');

router.post('/',
  authController.isLoggedIn,
  chirpController.newChirp
);

router.get('/',
  authController.isLoggedIn,
  chirpController.getAllChirps
);

router.get('/author',
  authController.isLoggedIn,
  chirpController.getChirpsFromAuthor
);

router.put('/share',
  authController.isLoggedIn,
  chirpController.shareChirp
);

router.put('/delete',
  authController.isLoggedIn,
  chirpController.deleteChirp
);

module.exports = router;
