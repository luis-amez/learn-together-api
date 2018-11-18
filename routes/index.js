const express = require('express');
const router = express.Router();

const Questions = require('../models/questions');

/* GET default resource */
router.get('/questions', (req, res, next) => {
  let questions = [];
  // TO-DO: improve questions selection and move it to the model
  while (questions.length < 2) {
    let index = Math.floor(Math.random() * Questions.length);
    questions.push(Questions[index]);
  }

  res.status(200).json(questions);
});

module.exports = router;
