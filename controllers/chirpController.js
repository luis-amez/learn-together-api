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
