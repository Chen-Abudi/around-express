const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    // the requirements for every user name field are described below:
    type: String, // the name is a string
    required: true, // every user has a name thus it's a required field
    minlength: 2, // minmum length is 2
    maxlength: 30, // maximum length is 30
  },
  about: {
    // the requirements for every user about field are described below:
    type: String, // the about is a string
    required: true, // every user has a desc thus it's a required field
    minlength: 2, // minmum length is 2
    maxlength: 30, // maximum length is 30
  },
  avatar: {
    type: String, // the avatar is a string
    required: [true, 'url is required'],
  },
});

module.exports = mongoose.model('user', userSchema);