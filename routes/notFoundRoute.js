const notFoundRouter = require('express').Router();
const { ERROR_CODE } = require('../utils/constants');

notFoundRouter.all('/', (req, res) => {
  res
    .status(ERROR_CODE.NOT_FOUND)
    .send({ message: 'Requested resource not found' });
});

module.exports = notFoundRouter;
