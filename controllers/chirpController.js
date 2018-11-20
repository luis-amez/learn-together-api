'use strict';

const Chirp = require('../models/chirp');

exports.newChirp = (req, res, next) => {
  const author = req.session.currentUser._id;
  const content = req.body.content;
  const newChirp = new Chirp({author, content});

  newChirp
    .save()
    .then((chirp) => {
      return res.status(200).json(chirp);
    })
    .catch((error) => {
      return next(error);
    });
};

exports.getAllChirps = (req, res, next) => {
  Chirp
    .find()
    .populate('author', 'username')
    .sort({ createdAt: 'desc' })
    .then((chirps) => {
      return res.status(200).json(chirps);
    })
    .catch((error) => {
      return next(error);
    });
};

exports.getChirpsFromAuthor = (req, res, next) => {
  const author = req.session.currentUser._id;

  Chirp
    .find({author})
    .sort({ createdAt: 'desc' })
    .then((chirps) => {
      return res.status(200).json(chirps);
    })
    .catch((error) => {
      return next(error);
    });
};

exports.shareChirp = (req, res, next) => {
  const user = req.session.currentUser._id;
  const chirpId = req.body.chirpId;

  Chirp
    .findByIdAndUpdate(
      chirpId,
      {$addToSet: {shares: user}},
      {safe: true, upsert: true, new: true}
    )
    .then((chirp) => {
      return res.status(200).json(chirp);
    })
    .catch((error) => {
      return next(error);
    });
};

exports.deleteChirp = (req, res, next) => {
  const currentUser = req.session.currentUser._id;
  const chirpId = req.body.chirpId;
  const dateInOneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  console.log('delete');
  console.log(currentUser);

  Chirp
    .findOneAndUpdate(
      {_id: chirpId, author: currentUser},
      {$set: {deleteDate: dateInOneWeek}},
      {safe: true, upsert: true, new: true}
    )
    .then((chirp) => {
      console.log(chirp);
      return res.status(200).json(chirp);
    })
    .catch((error) => {
      return next(error);
    });
};

exports.getStats = (req, res, next) => {
  console.log('getStats');
  const chirpId = req.params.chirpId;

  Chirp
    .findById(chirpId)
    .then((chirp) => {
      const stats = calculateStats(chirp);
      return res.status(200).json(stats);
    });
};

function calculateStats (chirp) {
  let stats = {};

  stats.popularity = calculatePopularity(chirp.createdAt, chirp.shares.length);
  stats.danger = calculateDanger(chirp.content);
  stats.offense = calculateOffense(chirp.content);

  return stats;
}

function calculatePopularity (dateOfCreation, numberOfShares) {
  let timeFromPostedInMinutes = Math.floor((Date.now() - dateOfCreation.getTime()) / (1000 * 60));
  console.log({timeFromPostedInMinutes});
  let reach = Math.floor(Math.random() * 9) + 11 * (timeFromPostedInMinutes + 1) + 1100 * numberOfShares;
  return reach;
}

function calculateDanger (message) {
  const dangerousExpressions = ['i live in', 'i live at', 'today i will be in', 'today i will be at', 'my card number', 'i\'m alone'];
  const lowerCaseMessage = message.toLowerCase();

  let danger = dangerousExpressions.reduce((score, expression) => {
    if (lowerCaseMessage.includes(expression)) {
      score += 10;
    }
    return score;
  }, 0);
  danger = danger > 100 ? 100 : danger;

  return danger;
}

function calculateOffense (message) {
  const listBadWords = require('badwords-list');
  const arrayBadWords = listBadWords.array;
  const ofensiveExpressions = ['i hate', 'die in fire'];
  const lowerCaseMessage = message.toLowerCase();

  let ofense = ofensiveExpressions.reduce((score, expression) => {
    if (lowerCaseMessage.includes(expression)) {
      score += 25;
    }
    return score;
  }, 0);
  message.split(' ').forEach((word) => {
    if (arrayBadWords.includes(word)) {
      ofense += 10;
    }
  });
  ofense = ofense > 100 ? 100 : ofense;

  return ofense;
}
