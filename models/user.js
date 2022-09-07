const mongoose = require('mongoose');
const { validateURL } = require('../utils/validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      // the requirements for every user name field are described below:
      type: String,
      required: [true, 'Please enter your name'],
      minlength: [2, 'Please lengthen this text to 2 characters or more'],
      maxlength: [30, 'Please lengthen this text to 30 characters or less'],
    },
    about: {
      // the requirements for every user about field are described below:
      type: String,
      required: [true, 'Please enter description'],
      minlength: [2, 'Please lengthen this text to 2 characters or more'],
      maxlength: [30, 'Please lengthen this text to 30 characters or less'],
    },
    avatar: {
      type: String,
      required: [true, 'Please enter a URL'],
      validate: {
        validator: (v) => validateURL(v),
        message: 'Please enter a valid URL for the avatar',
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
