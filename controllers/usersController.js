const User = require('../models/user');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// GET
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
    });
};

// GET
const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.USER_NOT_FOUND);
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_USER_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// POST
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_CARD_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// PATCH
const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.USER_NOT_FOUND);
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_USER_DATA);
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_USER_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// PATCH
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.USER_NOT_FOUND);
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_AVATAR_DATA);
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_AVATAR_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
