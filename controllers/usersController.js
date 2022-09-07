const User = require('../models/user');
const { createError, errorHandler } = require('../helpers/errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send({ message: 'An error has occurred on the server' });
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) =>
      createError(error, ERROR_MESSAGE.USER_NOT_FOUND, ERROR_CODE.NOT_FOUND)
    )
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) =>
      createError(
        error,
        ERROR_MESSAGE.INCORRECT_USER_DATA,
        ERROR_CODE.INCORRECT_DATA
      )
    )
    .catch(next);
};

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
    .catch((error) =>
      errorHandler(
        error,
        ERROR_MESSAGE.USER_NOT_FOUND,
        ERROR_MESSAGE.INCORRECT_USER_DATA
      )
    )
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .orFail()
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((error) =>
      errorHandler(
        error,
        ERROR_MESSAGE.INCORRECT_AVATAR_DATA,
        ERROR_MESSAGE.INCORRECT_USER_DATA
      )
    )
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
