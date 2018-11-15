const express = require('express');
const router = express.Router();

const Questions = require('../models/questions');

/* GET default resource */
router.get('/question', (req, res, next) => {
  const index = Math.floor(Math.random() * Questions.length);
  const question = Questions[index];

  res.status(200).json(question);
});

module.exports = router;
