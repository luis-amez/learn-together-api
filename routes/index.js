const express = require('express');
const router = express.Router();

const Questions = require('../models/questions');

/* GET default resource */
router.get('/question', (req, res, next) => {
  let questions = [];
  let previouslySelectedIndexes = [];
  // TO-DO: improve questions selection and move it to the model
  while (questions.length < 2) {
    let index = Math.floor(Math.random() * Questions.length);

    if(!checkForRepeats(previouslySelectedIndexes, index)) {
      questions.push(Questions[index]);
      previouslySelectedIndexes.push(index);
    }
  }

  res.status(200).json(questions);
});

function checkForRepeats(aPrevSelectIndexes, currentIndex) {
  let isRepeated = false;
  for(let repeatIndex of aPrevSelectIndexes){
    if(repeatIndex == currentIndex){
      isRepeated = true;
    }
  }
  return isRepeated;
}

module.exports = router;
