const mongoose = require('mongoose');
const { validatorURL } = require('../utils/validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is requierd'],
    minlength: [2, 'Please lengthen this text to 2 characters or more'],
    maxlength: [30, 'Please lengthen this text to 30 characters or less'],
  },
  link: {
    type: String,
    required: [true, 'Please enter a URL'],
    validate: {
      validator: (v) => validatorURL(v),
      message: 'Please enter a valid URL for picture',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
