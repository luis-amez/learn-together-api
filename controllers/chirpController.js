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
