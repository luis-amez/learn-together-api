'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const chirpSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Chirp = mongoose.model('Chirp', chirpSchema);

module.exports = Chirp;
