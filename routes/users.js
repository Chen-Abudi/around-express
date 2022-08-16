const express = require('express');
const { getUsers, getUserById } = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
