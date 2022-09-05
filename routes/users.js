const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
} = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);

module.exports = usersRouter;
