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
  },
  shares: {
    type: [{ type: Schema.ObjectId, ref: 'User' }],
    default: []
  },
  deleteDate: {
    type: Date,
    default: undefined
  }
}, {
  timestamps: true
});

const Chirp = mongoose.model('Chirp', chirpSchema);

module.exports = Chirp;
