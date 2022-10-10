const express = require('express');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/usersController');

const {
  validateUserProfile,
  validateUserAvatar,
  validateObjectId,
} = require('../middleware/validation');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:_id', validateObjectId, getUserById);
usersRouter.get('/me', getCurrentUser);
// usersRouter.post('/', createUser);
usersRouter.patch('/me', validateUserProfile, updateUser);
usersRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
